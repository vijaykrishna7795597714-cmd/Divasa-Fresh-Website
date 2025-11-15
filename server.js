require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// Simple file storage for uploaded price lists
const upload = multer({ dest: 'uploads/' });

// MongoDB models
const leadSchema = new mongoose.Schema({
  businessName: String,
  contactPerson: String,
  phone: String,
  type: String,
  dailyRequirement: String,
  location: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'New' },
  notes: String
});
const Lead = mongoose.model('Lead', leadSchema);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/divasa', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>console.log('Mongo connected'))
  .catch(e=>console.error('Mongo error', e));

// Nodemailer transporter (use Gmail app password or any SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes
app.get('/', (req, res) => res.send('Divasa Fresh Backend'));

app.post('/api/leads', async (req, res) => {
  try {
    const data = req.body;
    const lead = new Lead(data);
    await lead.save();

    // send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Lead - ${data.businessName || data.contactPerson}`,
      text: JSON.stringify(data, null, 2)
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error('Mail error', err);
    });

    // Prepare wa.me link (first number)
    const numbers = (process.env.WHATSAPP_NUMBERS || '').split(',');
    const waNumber = numbers[0] ? numbers[0].replace('+','') : '';
    const waText = encodeURIComponent(`New lead from website:\n${data.businessName || ''}\nContact: ${data.contactPerson || ''} - ${data.phone || ''}\nType: ${data.type || ''}\nLocation: ${data.location || ''}`);
    const waLink = waNumber ? `https://wa.me/${waNumber}?text=${waText}` : null;

    res.json({ success: true, waLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/upload-price', upload.single('file'), (req, res) => {
  // In production, save file to cloud storage and store metadata in DB
  if (!req.file) return res.status(400).json({ error: 'No file' });
  res.json({ success: true, filename: req.file.filename, originalname: req.file.originalname, path: req.file.path });
});

// Simple admin login (dev-only). Returns JWT if password matches env ADMIN_PASSWORD
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET || 'secret', { expiresIn: '12h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid' });
});

// Protected route to list leads
app.get('/api/admin/leads', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const leads = await Lead.find().sort({ createdAt: -1 }).limit(1000);
    res.json({ leads });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log('Server running on', PORT));
