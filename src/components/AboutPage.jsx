import React from 'react';
import { Sparkles, Heart, Leaf, Award } from 'lucide-react';
import './AboutPage.css';

const AboutPage = ({ onShopClick }) => {
  return (
    <div className="about-page-root">
      {/* Editorial Hero Header */}
      <section className="about-hero">
        <div className="container about-hero-container">
          <span className="about-eyebrow">
            <Sparkles size={13} />
            The Atelier Philosophy
          </span>
          <h1 className="about-title">
            Clothing Crafted With Quiet Majesty & Lasting Purpose
          </h1>
          <p className="about-lead">
            OLIVÉRA was founded on the belief that what touches your skin daily should possess 
            organic integrity, refined simplicity, and timeless grace.
          </p>
        </div>
      </section>

      {/* Narrative Section 1 */}
      <section className="about-story-section container">
        <div className="about-story-grid">
          <div className="about-story-media">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80" 
              alt="Artisanal tailoring in our atelier"
              className="about-story-img"
            />
            <div className="about-caption-box">
              <span>Atelier Archive &bull; Normandy Flax & Hand-stitched Lapels</span>
            </div>
          </div>

          <div className="about-story-copy">
            <span className="story-step-num">01 / Origin</span>
            <h2 className="story-heading">Beyond the Fast Fashion Cycle</h2>
            <p>
              In an era dominated by synthetic fibers, planned obsolescence, and hyper-production, 
              we chose the deliberate slowness of true craftsmanship. Every garment begins with 
              a respect for the raw materials gifted by the earth.
            </p>
            <p>
              We source only natural, regenerative fibers: rain-fed Normandy flax linen, unrefined 
              handloom silk with natural slub textures, and long-staple organic cotton. These materials 
              do not suffocate the skin; they breathe, soften, and age with an endearing patina.
            </p>
            <div className="story-quote">
              &ldquo;We design for the collector who values one impeccable trench over a dozen disposable garments.&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* Pillars of Integrity Grid */}
      <section className="about-pillars-section">
        <div className="container">
          <div className="pillars-header">
            <span className="pillars-eyebrow">Our Core Principles</span>
            <h2 className="pillars-title">The Three Atelier Standards</h2>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Leaf size={24} />
              </div>
              <h3 className="pillar-name">Pure Botanical Fibres</h3>
              <p className="pillar-desc">
                100% certified European flax linen and organic combed cotton. Zero micro-plastics, 
                zero synthetic polyester linings, and chemical-free washing.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Award size={24} />
              </div>
              <h3 className="pillar-name">Limited Micro-Batches</h3>
              <p className="pillar-desc">
                Each silhouette is produced in runs of 50 to 150 pieces. We cut only to demand, 
                eliminating deadstock and ensuring every centimeter of fabric is cherished.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Heart size={24} />
              </div>
              <h3 className="pillar-name">Dignified Craftsmanship</h3>
              <p className="pillar-desc">
                Our master pattern cutters, embroiderers, and tailors work in sunlit, ethical ateliers 
                with fair living wages, healthcare, and deep respect for their trade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Visual Breakdown */}
      <section className="about-materials-section container">
        <div className="materials-grid">
          <div className="material-item">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80" 
              alt="Pure Normandy Flax Linen"
            />
            <h4>Normandy Flax Linen</h4>
            <p>Naturally temperature-regulating, durable, and hypoallergenic.</p>
          </div>

          <div className="material-item">
            <img 
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80" 
              alt="Raw Handloom Silk"
            />
            <h4>Raw Handloom Silk</h4>
            <p>Matte lustre, subtle slub grain, woven on wooden heritage looms.</p>
          </div>

          <div className="material-item">
            <img 
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80" 
              alt="Organic Long-Staple Cotton"
            />
            <h4>Organic Cotton Twill</h4>
            <p>Dense 320 GSM weave for structured safari jackets and relaxed trousers.</p>
          </div>
        </div>

        <div className="about-cta-bar">
          <h3>Experience the Feel of True Craftsmanship</h3>
          <p>Explore our current capsule collection tailored for everyday ease.</p>
          <button 
            className="btn btn-primary"
            onClick={onShopClick}
          >
            Explore The Collection
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
