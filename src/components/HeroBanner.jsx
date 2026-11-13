import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Leaf, Star } from 'lucide-react';
import './HeroBanner.css';

const HeroBanner = ({ onShopNowClick }) => {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        {/* Left Editorial Copy */}
        <div className="hero-content">
          <div className="hero-pill-badge">
            <Sparkles size={14} className="hero-pill-icon" />
            <span>Autumn / Festive Couture 2026</span>
          </div>

          <h1 className="hero-headline">
            Where Olive Green Meets <br />
            <span className="hero-headline-highlight">Pure Ivory Silk & Linen.</span>
          </h1>

          <p className="hero-subheading">
            Immerse yourself in bespoke sartorial craftsmanship. An editorial celebration 
            of sustainable European flax, Mongolian cashmere, and artisanal raw silk—tailored 
            for those who appreciate quiet opulence.
          </p>

          <div className="hero-cta-group">
            <button 
              className="btn btn-primary btn-lg hero-cta-btn"
              onClick={onShopNowClick}
            >
              <span>Explore Collection</span>
              <ArrowRight size={18} />
            </button>
            <a href="#lookbook" className="btn btn-outline-olive btn-lg hero-lookbook-btn">
              <span>View Lookbook</span>
            </a>
          </div>

          {/* Social Proof & Trust Metric Bar */}
          <div className="hero-metrics">
            <div className="metric-item">
              <div className="metric-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#c5a059" color="#c5a059" />
                ))}
              </div>
              <span className="metric-label">4.9/5 from 25k+ Patrons</span>
            </div>

            <div className="metric-divider"></div>

            <div className="metric-item">
              <div className="metric-icon-box">
                <Leaf size={16} />
              </div>
              <span className="metric-label">100% Certified Organic Linen</span>
            </div>

            <div className="metric-divider"></div>

            <div className="metric-item">
              <div className="metric-icon-box">
                <ShieldCheck size={16} />
              </div>
              <span className="metric-label">30-Day Hassle-Free Exchanges</span>
            </div>
          </div>
        </div>

        {/* Right Layered Visual Grid */}
        <div className="hero-visual">
          <div className="hero-image-card card-primary">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80" 
              alt="OLIVÉRA Autumn Linen Collection Editorial" 
              className="hero-main-img"
            />
            <div className="image-tag-overlay glass-dark">
              <span className="tag-season">AW/26</span>
              <p className="tag-title">The Atelier French Trench</p>
              <span className="tag-price">Rs. 14,500</span>
            </div>
          </div>

          <div className="hero-image-card card-secondary">
            <img 
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80" 
              alt="OLIVÉRA Men Sartorial Double Breasted Suit" 
              className="hero-sub-img"
            />
            <div className="floating-badge-luxe">
              <span className="badge-dot"></span>
              <span>Handcrafted in Pure Linen</span>
            </div>
          </div>

          {/* Luxury decorative accent ring */}
          <div className="hero-deco-circle"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
