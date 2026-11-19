import React from 'react';
import { ArrowRight, BookOpen, Sparkles, Leaf, ShieldCheck, Star } from 'lucide-react';
import './HeroBanner.css';

const HeroBanner = ({ onShopNowClick, onArticlesClick }) => {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        {/* Left Editorial Copy */}
        <div className="hero-content">
          <div className="hero-pill-badge">
            <Sparkles size={12} className="hero-pill-icon" />
            <span>Autumn / Winter Capsule 2026</span>
          </div>

          <h1 className="hero-headline">
            Mindful Tailoring, <br />
            <span className="hero-headline-highlight">Quiet Luxury.</span>
          </h1>

          <p className="hero-subheading">
            An editorial collection of rain-fed European flax linen, raw handloom silk, 
            and relaxed outerwear—tailored in limited batches for everyday ease and lasting grace.
          </p>

          <div className="hero-cta-group">
            <button 
              className="btn btn-primary btn-lg hero-cta-btn"
              onClick={onShopNowClick}
            >
              <span>Explore Collection</span>
              <ArrowRight size={16} />
            </button>
            <button 
              onClick={onArticlesClick}
              className="btn btn-outline-olive btn-lg hero-articles-btn"
            >
              <BookOpen size={16} />
              <span>Read Journal</span>
            </button>
          </div>

          {/* Minimal Trust & Metrics Bar */}
          <div className="hero-metrics">
            <div className="metric-item">
              <div className="metric-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="#b89758" color="#b89758" />
                ))}
              </div>
              <span className="metric-label">4.9/5 from 2,500+ Patrons</span>
            </div>

            <div className="metric-divider"></div>

            <div className="metric-item">
              <div className="metric-icon-box">
                <Leaf size={14} />
              </div>
              <span className="metric-label">100% Certified Organic Flax</span>
            </div>

            <div className="metric-divider"></div>

            <div className="metric-item">
              <div className="metric-icon-box">
                <ShieldCheck size={14} />
              </div>
              <span className="metric-label">30-Day Doorstep Exchanges</span>
            </div>
          </div>
        </div>

        {/* Right Aesthetic Imagery */}
        <div className="hero-visual">
          <div className="hero-ambient-glow"></div>

          <div className="hero-floating-pill-top">
            <Leaf size={13} className="pill-leaf-icon" />
            <span>Pure Flax &bull; Normandy Certified</span>
          </div>

          <div className="hero-image-card card-primary">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80" 
              alt="OLIVÉRA Linen Collection Editorial" 
              className="hero-main-img"
            />
            <div className="image-tag-overlay glass-dark">
              <span className="tag-season">AW/26 Capsule</span>
              <p className="tag-title">French Normandy Linen Trench</p>
              <span className="tag-price">Rs. 14,500</span>
            </div>
          </div>

          <div className="hero-image-card card-secondary">
            <img 
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80" 
              alt="OLIVÉRA Sartorial Tailoring" 
              className="hero-sub-img"
            />
            <div className="floating-badge-luxe">
              <span className="badge-dot"></span>
              <span>Limited Batch &bull; 100 Pieces</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
