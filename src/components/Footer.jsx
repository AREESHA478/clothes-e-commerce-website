import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ArrowUp, 
  MapPin, 
  Mail, 
  Phone,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import './Footer.css';

const Footer = ({ onSelectCategory }) => {
  const { 
    setIsSizeGuideOpen, 
    setIsOrderTrackingOpen, 
    setIsAccountOpen, 
    setIsAuthModalOpen, 
    user 
  } = useShop();


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-root">
      {/* Upper Main Footer */}
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Column 1: Brand Lore */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <span className="brand-name">OLIVÉRA</span>
              <span className="brand-tagline">ATELIER &bull; COUTURE</span>
            </div>

            <p className="footer-bio">
              Founded on the belief that everyday clothing should possess quiet majesty. 
              We craft contemporary garments from European flax, raw handloom silk, and 
              organic cotton in signature olive green and warm cream palettes.
            </p>

            <div className="footer-contact-items">
              <div className="contact-row">
                <MapPin size={16} className="contact-icon" />
                <span>Flagship Atelier: 12-C Gulberg III, Lahore, Pakistan</span>
              </div>
              <div className="contact-row">
                <Phone size={16} className="contact-icon" />
                <span>Client Concierge: +92 321 OLIVÉRA (654-8372)</span>
              </div>
              <div className="contact-row">
                <Mail size={16} className="contact-icon" />
                <span>concierge@olivera-couture.com</span>
              </div>
            </div>

            <div className="footer-social-links">
              <a href="#instagram" className="social-icon" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#facebook" className="social-icon" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#twitter" className="social-icon" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div className="footer-col">
            <h4 className="footer-heading">Collections</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => onSelectCategory('Women')}>Women’s Atelier</button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Men')}>Men’s Sartorial</button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Co-ords')}>Linen & Co-ord Sets</button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Outerwear')}>Safari Trench & Jackets</button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Festive')}>Festive Occasion Wear</button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Sale')}>Seasonal Archive Sale</button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Guides */}
          <div className="footer-col">
            <h4 className="footer-heading">Client Services</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => setIsSizeGuideOpen(true)}>Bespoke Sizing Guide</button>
              </li>
              <li>
                <button onClick={() => setIsOrderTrackingOpen(true)}>Track Express Dispatch</button>
              </li>
              <li>
                <button onClick={() => user ? setIsAccountOpen(true) : setIsAuthModalOpen(true)}>
                  {user ? 'My Orders & Atelier Profile' : 'Privé Member Sign In'}
                </button>
              </li>
              <li>
                <a href="#exchanges">30-Day Doorstep Exchange Policy</a>
              </li>
              <li>
                <a href="#linen-care">Linen & Silk Garment Care</a>
              </li>
              <li>
                <a href="#sustainability">Biodegradable Packaging & Ethics</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Flagship Boutiques */}
          <div className="footer-col">
            <h4 className="footer-heading">Flagship Boutiques</h4>
            <div className="boutique-list">
              <div className="boutique-item">
                <strong className="boutique-city">Lahore Atelier</strong>
                <p>12-C Gulberg III, M.M. Alam Road</p>
                <span className="boutique-hours">Mon - Sat: 11:00 AM - 10:00 PM</span>
              </div>
              <div className="boutique-item">
                <strong className="boutique-city">Karachi Salon</strong>
                <p>Block 4, Clifton, Marine Drive</p>
                <span className="boutique-hours">Daily: 12:00 PM - 11:00 PM</span>
              </div>
              <div className="boutique-item">
                <strong className="boutique-city">Islamabad Suite</strong>
                <p>Beverly Centre, Blue Area</p>
                <span className="boutique-hours">Mon - Sat: 11:30 AM - 9:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Payment Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p className="copyright-text">
            &copy; 2026 OLIVÉRA ATELIER LTD. All rights reserved. Handcrafted with reverence for natural fibers.
          </p>

          <div className="payment-badges-row">
            <span className="payment-pill">Cash on Delivery (COD)</span>
            <span className="payment-pill">Visa</span>
            <span className="payment-pill">MasterCard</span>
            <span className="payment-pill">EasyPaisa</span>
            <span className="payment-pill">JazzCash</span>
          </div>

          <button onClick={scrollToTop} className="scroll-top-btn" title="Back to top">
            <ArrowUp size={16} />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
