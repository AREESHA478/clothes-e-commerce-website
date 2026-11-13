import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones, Award } from 'lucide-react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Truck size={28} />,
      title: 'Express Nationwide Delivery',
      desc: 'Complimentary shipping across Pakistan on orders over Rs. 10,000. Delivered in 2-3 business days in archival luxury boxes.'
    },
    {
      icon: <Award size={28} />,
      title: '100% Ethical Fabrics',
      desc: 'Only certified Normandy flax linen, Egyptian organic cotton, and handloom silks dyed with non-toxic botanical pigments.'
    },
    {
      icon: <RefreshCw size={28} />,
      title: '30-Day Hassle-Free Exchanges',
      desc: 'Incorrect fit? Our courier will pick up from your doorstep and swap sizes or issue full store credit with zero questions.'
    },
    {
      icon: <Headphones size={28} />,
      title: 'Dedicated Styling Concierge',
      desc: 'Connect with our in-house bespoke stylists via WhatsApp or call for personalized sizing advice, fabric swatches, and styling.'
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="features-grid">
          {features.map((feat, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon-wrapper">
                {feat.icon}
              </div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
