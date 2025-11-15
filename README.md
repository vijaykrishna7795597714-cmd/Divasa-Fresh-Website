
Divasa Fresh - Promo Website + Admin Panel
=========================================

This is a ready-to-deploy minimal full-stack project for Divasa Fresh (Promo website + Admin).
Colors: Green & White
Domain: DivasaFresh.in (you will buy later)
Logo: included (user uploaded separately)

WhatsApp numbers provided:
- +919900152573
- +918296483015

Notification email (assumed): divasafreshf2f@gmail.com

About Us (Medium paragraph):
Divasa Fresh started with a mission to bring farm-fresh, graded vegetables directly from farmers to business kitchens and families across Bangalore. We supply daily to restaurants, PGs, hostels, cafes, and apartment communities with a strict quality-first process and reliable same-day delivery. Our focus is on consistent pricing, transparent grading, and building long-term partnerships with kitchens that need fresh ingredients delivered on time.

Quick start (development)
-------------------------
1. Backend:
   - cd backend
   - copy .env.example -> .env and fill values (MONGO_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS, WHATSAPP_NUMBERS (comma-separated))
   - npm install
   - npm run dev

2. Frontend:
   - cd frontend
   - npm install
   - npm run dev

This repository is a minimal scaffold. For production, follow the deployment steps in the DEPLOYMENT section below.

Deployment
----------
- Host backend on any Node-friendly host (Render, Railway, Heroku, DigitalOcean).
- Host frontend on Vercel / Netlify (recommended).
- Use MongoDB Atlas for database.
- Use a proper email provider (Gmail app password or SendGrid) for nodemailer.
- For automated WhatsApp sending you need WhatsApp Cloud API or Twilio (not included). This project provides a wa.me link so your sales team can click to open WhatsApp with a prefilled message.

Files included:
- frontend/ (Vite + React)
- backend/ (Express + Mongoose)
- README.md (this file)

