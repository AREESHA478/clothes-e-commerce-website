import React from 'react';
import { testimonialsData } from '../data/products';
import { Star, CheckCircle, Quote } from 'lucide-react';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  return (
    <section className="section-padding testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Patron Accolades</span>
          <h2 className="section-title">Loved by Connoisseurs</h2>
          <p className="section-subtitle">
            Read unfiltered impressions from clients who embrace mindful craftsmanship and 
            understated elegance.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonialsData.map((item) => (
            <div key={item.id} className="testimonial-card glass-panel">
              <div className="quote-badge">
                <Quote size={20} />
              </div>

              <div className="testimonial-stars">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#c5a059" color="#c5a059" />
                ))}
              </div>

              <p className="testimonial-comment">
                "{item.comment}"
              </p>

              <div className="testimonial-purchased">
                <span className="purchased-label">Verified Purchase:</span>
                <span className="purchased-item">{item.itemBought}</span>
              </div>

              <div className="testimonial-author">
                <img src={item.avatar} alt={item.name} className="author-avatar" />
                <div className="author-info">
                  <div className="author-name-row">
                    <h4 className="author-name">{item.name}</h4>
                    <span className="verified-badge" title="Verified Customer">
                      <CheckCircle size={14} />
                      <span>Verified</span>
                    </span>
                  </div>
                  <span className="author-city">{item.city} &bull; {item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
