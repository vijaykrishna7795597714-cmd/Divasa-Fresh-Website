import React from 'react';
import axios from 'axios';

export default function PriceList(){
  const [file, setFile] = React.useState(null);
  const upload = async e => {
    e.preventDefault();
    if(!file) return alert('Select file');
    const fd = new FormData();
    fd.append('file', file);
    const res = await axios.post((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/upload-price', fd, { headers: {'Content-Type':'multipart/form-data'}});
    if(res.data.success) alert('Price list uploaded: ' + res.data.originalname);
  };
  return (
    <div className="container">
      <h2>Price List</h2>
      <p>To receive today's price list, please submit your contact details on the Home page or contact us on WhatsApp.</p>
      <form onSubmit={upload}>
        <div className="form-row"><input type="file" onChange={e=>setFile(e.target.files[0])} /></div>
        <div className="form-row"><button className="lead-btn" type="submit">Upload Price List (Admin)</button></div>
      </form>
    </div>
  );
}
