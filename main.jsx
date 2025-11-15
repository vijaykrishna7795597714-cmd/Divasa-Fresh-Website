import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import PriceList from './pages/PriceList';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Admin from './pages/Admin';
import './styles.css';

function App(){
  return (
    <BrowserRouter>
      <header className="site-header">
        <div className="container">
          <Link to="/"><h1 className="brand">Divasa Fresh</h1></Link>
          <nav>
            <Link to="/services">Services</Link>
            <Link to="/pricelist">Price List</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/testimonials">Testimonials</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/admin">Admin</Link>
          </nav>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/pricelist" element={<PriceList/>} />
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="/testimonials" element={<Testimonials/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container">© Divasa Fresh | Farmers to Family</div>
      </footer>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
