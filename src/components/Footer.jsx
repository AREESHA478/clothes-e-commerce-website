import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ArrowUp, 
  MapPin, 
  Mail, 
  Phone
} from 'lucide-react';
import './Footer.css';

const Footer = ({ onNavigatePage, onSelectCategory }) => {
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

  const handleNavPage = (pageName) => {
    if (onNavigatePage) {
      onNavigatePage(pageName);
    }
    scrollToTop();
  };

  const handleCategory = (cat) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  return (
    <footer className="footer-root">
      {/* Upper Main Footer */}
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Column 1: Brand Lore */}
          <div className="footer-col brand-col">
            <div className="footer-brand" onClick={() => handleNavPage('home')}>
              <span className="brand-name">OLIVÉRA</span>
              <span className="brand-tagline">ATELIER &bull; COUTURE</span>
            </div>

            <p className="footer-bio">
              Founded on the belief that everyday apparel should possess quiet majesty. 
              We craft contemporary garments from Normandy flax linen, raw handloom silk, and 
              organic cotton in signature olive green and warm cream palettes.
            </p>

            <div className="footer-contact-items">
              <div className="contact-row">
                <MapPin size={15} className="contact-icon" />
                <span>12-C Gulberg III, M.M. Alam Road, Lahore</span>
              </div>
              <div className="contact-row">
                <Phone size={15} className="contact-icon" />
                <span>+92 321 OLIVÉRA (654-8372)</span>
              </div>
              <div className="contact-row">
                <Mail size={15} className="contact-icon" />
                <span>concierge@olivera-couture.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation & Pages */}
          <div className="footer-col">
            <h4 className="footer-heading">Explore Pages</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => handleNavPage('home')}>Home</button>
              </li>
              <li>
                <button onClick={() => handleNavPage('shop')}>Shop Catalog</button>
              </li>
              <li>
                <button onClick={() => handleNavPage('articles')} className="footer-articles-link">
                  Articles & Journal
                  <span className="footer-new-badge">New</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavPage('about')}>About the Atelier</button>
              </li>
              <li>
                <button onClick={() => handleNavPage('contact')}>Contact & Concierge</button>
              </li>
              <li>
                <button onClick={() => setIsOrderTrackingOpen(true)}>Track Consignment</button>
              </li>
            </ul>
          </div>

          {/* Column 3: Collections */}
          <div className="footer-col">
            <h4 className="footer-heading">Collections</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => handleCategory('Women')}>Women’s Atelier</button>
              </li>
              <li>
                <button onClick={() => handleCategory('Men')}>Men’s Sartorial</button>
              </li>
              <li>
                <button onClick={() => handleCategory('Co-ords')}>Linen & Co-ord Sets</button>
              </li>
              <li>
                <button onClick={() => handleCategory('Outerwear')}>Safari Trench & Jackets</button>
              </li>
              <li>
                <button onClick={() => handleCategory('Festive')}>Festive Occasion Wear</button>
              </li>
              <li>
                <button onClick={() => handleCategory('Sale')}>Seasonal Archive Sale</button>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Services & Boutiques */}
          <div className="footer-col">
            <h4 className="footer-heading">Client Services</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => setIsSizeGuideOpen(true)}>Bespoke Sizing Guide</button>
              </li>
              <li>
                <button onClick={() => user ? setIsAccountOpen(true) : setIsAuthModalOpen(true)}>
                  {user ? 'My Orders & Atelier Profile' : 'Member Sign In'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavPage('contact')}>30-Day Doorstep Exchange</button>
              </li>
              <li>
                <button onClick={() => handleNavPage('articles')}>Fabric Care & Longevity</button>
              </li>
              <li>
                <button onClick={() => handleNavPage('about')}>Sustainable Craft & Ethics</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Payment Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p className="copyright-text">
            &copy; 2026 OLIVÉRA ATELIER. All rights reserved. Handcrafted with reverence for natural fibers.
          </p>

          <div className="payment-badges-row">
            <span className="payment-pill">Cash on Delivery (COD)</span>
            <span className="payment-pill">Visa</span>
            <span className="payment-pill">MasterCard</span>
            <span className="payment-pill">EasyPaisa</span>
            <span className="payment-pill">JazzCash</span>
          </div>

          <button onClick={scrollToTop} className="scroll-top-btn" title="Back to top">
            <ArrowUp size={15} />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
