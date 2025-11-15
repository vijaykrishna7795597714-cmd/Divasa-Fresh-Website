import React from 'react';
import axios from 'axios';

export default function Home(){
  const [form, setForm] = React.useState({ businessName:'', contactPerson:'', phone:'', type:'PG', dailyRequirement:'', location:'' });
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/leads', form);
      if(res.data.waLink) window.open(res.data.waLink,'_blank');
      alert('Lead submitted. We will contact you soon.');
      setForm({ businessName:'', contactPerson:'', phone:'', type:'PG', dailyRequirement:'', location:'' });
    } catch(e){
      alert('Error submitting lead');
    }
  };

  return (
    <div className="container">
      <section className="hero">
        <h2>Graded Vegetables Delivered Daily in Bangalore</h2>
        <p>Farm-fresh vegetables for every business kitchen — restaurants, PGs, hostels, and apartments.</p>
        <a className="lead-btn" href="/pricelist">Get Today's Price List</a>
      </section>

      <section>
        <h3>Book a Sample Delivery / Become a Customer</h3>
        <form onSubmit={submit} style={{maxWidth:720}}>
          <div className="form-row"><input name="businessName" placeholder="Business Name" value={form.businessName} onChange={onChange} required/></div>
          <div className="form-row"><input name="contactPerson" placeholder="Contact Person" value={form.contactPerson} onChange={onChange} required/></div>
          <div className="form-row"><input name="phone" placeholder="Phone / WhatsApp" value={form.phone} onChange={onChange} required/></div>
          <div className="form-row">
            <select name="type" value={form.type} onChange={onChange}>
              <option>PG</option><option>Restaurant</option><option>Cafe</option><option>Apartment</option><option>Hotel</option>
            </select>
          </div>
          <div className="form-row"><input name="dailyRequirement" placeholder="Daily requirement (eg: 10 kg tomatoes, 5 kg onions)" value={form.dailyRequirement} onChange={onChange}/></div>
          <div className="form-row"><input name="location" placeholder="Location (Google Maps link or area)" value={form.location} onChange={onChange}/></div>
          <div className="form-row"><button className="lead-btn" type="submit">Submit Lead / Book Sample</button></div>
        </form>
      </section>
    </div>
  );
}
