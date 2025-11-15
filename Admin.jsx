import React from 'react';
import axios from 'axios';

export default function Admin(){
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState(localStorage.getItem('df_token')||'');
  const [leads, setLeads] = React.useState([]);

  const login = async () => {
    try{
      const res = await axios.post((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/admin/login',{ password });
      localStorage.setItem('df_token', res.data.token);
      setToken(res.data.token);
      alert('Logged in');
    }catch(e){ alert('Login failed'); }
  };

  const loadLeads = async () => {
    try{
      const res = await axios.get((import.meta.env.VITE_API_URL||'http://localhost:5000') + '/api/admin/leads', { headers: { Authorization: 'Bearer ' + token }});
      setLeads(res.data.leads);
    }catch(e){ alert('Cannot load leads. Check token.'); }
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      {!token && (
        <div style={{maxWidth:400}}>
          <p>Enter admin password to login (dev-only)</p>
          <input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <div style={{marginTop:8}}><button className="lead-btn" onClick={login}>Login</button></div>
        </div>
      )}
      {token && (
        <>
          <div style={{marginTop:12}}>
            <button className="lead-btn" onClick={loadLeads}>Load Leads</button>
          </div>
          <div style={{marginTop:12}}>
            {leads.length===0 ? <p>No leads loaded</p> : (
              <table style={{width:'100%', borderCollapse:'collapse'}}>
                <thead><tr><th>Business</th><th>Contact</th><th>Phone</th><th>Type</th><th>Req</th><th>When</th></tr></thead>
                <tbody>
                  {leads.map(l=>(
                    <tr key={l._id}><td>{l.businessName}</td><td>{l.contactPerson}</td><td>{l.phone}</td><td>{l.type}</td><td>{l.dailyRequirement}</td><td>{new Date(l.createdAt).toLocaleString()}</td></tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
