import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  ChevronDown, 
  CheckCircle, 
  Sparkles 
} from 'lucide-react';
import './ContactPage.css';

const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Garment Sizing & Fit',
    message: ''
  });

  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'How does OLIVÉRA sizing compare to standard international brands?',
      a: 'Our silhouettes feature relaxed, tailored ease inspired by timeless European cuts. We recommend taking your usual size for a contemporary relaxed drape, or sizing down if you prefer a slim, structured fit. Detailed garment measurements are available via our Size Guide modal.'
    },
    {
      q: 'What is your shipping timeline and delivery fee across Pakistan?',
      a: 'We offer complimentary express delivery on all orders exceeding Rs. 10,000. Orders within Lahore, Karachi, and Islamabad are typically delivered in 2–3 business days via TCS Premier or Leopards Express.'
    },
    {
      q: 'Can I exchange or return a piece if it doesn’t suit me?',
      a: 'Yes, absolutely. We offer a 30-day seamless exchange window for unworn, unaltered garments with all original atelier tags attached. Contact our concierge team and we arrange reverse pickup from your doorstep.'
    },
    {
      q: 'How should I care for my raw silk and pure linen pieces?',
      a: 'We advise washing pure linen on a gentle, cool cycle (30°C) with eco-friendly detergent and air drying in a shaded breeze. For raw silk pieces, spot clean or opt for gentle green dry cleaning to maintain the natural slub texture and lustre.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="contact-page-root">
      {/* Editorial Header */}
      <section className="contact-hero">
        <div className="container contact-hero-container">
          <span className="contact-eyebrow">
            <MessageSquare size={13} />
            Client Concierge & Atelier
          </span>
          <h1 className="contact-title">We are Here to Assist You</h1>
          <p className="contact-lead">
            Whether you seek personal styling advice, fabric care guidance, or bespoke fitting inquiries, 
            our concierge team in Lahore welcomes you.
          </p>
        </div>
      </section>

      <div className="container contact-main-container">
        <div className="contact-split-grid">
          {/* Left Column: Form */}
          <div className="contact-form-card">
            <h2 className="contact-card-title">Send a Message</h2>
            <p className="contact-card-sub">
              Fill in your details below and an atelier stylist will respond within 4 hours.
            </p>

            {formSubmitted ? (
              <div className="form-success-banner">
                <CheckCircle size={32} className="success-icon" />
                <h3>Message Received</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. An email confirmation has been sent to <strong>{formData.email}</strong>. Our concierge will be in touch shortly.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', topic: 'Garment Sizing & Fit', message: '' });
                  }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                      id="name"
                      type="text" 
                      required 
                      placeholder="e.g. Fatima Zahra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      id="email"
                      type="email" 
                      required 
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="topic">Inquiry Subject</label>
                  <select 
                    id="topic"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  >
                    <option value="Garment Sizing & Fit">Garment Sizing & Fit</option>
                    <option value="Order Tracking & Delivery">Order Tracking & Delivery</option>
                    <option value="Custom Atelier Inquiry">Custom Atelier Inquiry</option>
                    <option value="Exchange or Return">Exchange or Return</option>
                    <option value="Editorial & Press">Editorial & Press</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea 
                    id="message"
                    rows="5" 
                    required 
                    placeholder="Tell us how we can assist you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary contact-submit-btn">
                  <span>Send Concierge Inquiry</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Info & Flagship Atelier */}
          <div className="contact-info-col">
            <div className="atelier-info-card">
              <h3 className="info-card-heading">Flagship Atelier</h3>
              
              <div className="info-item">
                <MapPin size={20} className="info-item-icon" />
                <div>
                  <strong>Lahore Atelier & Showroom</strong>
                  <p>12-C Gulberg III, M.M. Alam Road, Lahore, Pakistan</p>
                </div>
              </div>

              <div className="info-item">
                <Phone size={20} className="info-item-icon" />
                <div>
                  <strong>Concierge Phone & WhatsApp</strong>
                  <p>+92 321 OLIVÉRA (654-8372)</p>
                </div>
              </div>

              <div className="info-item">
                <Mail size={20} className="info-item-icon" />
                <div>
                  <strong>Electronic Correspondence</strong>
                  <p>concierge@olivera-couture.com</p>
                </div>
              </div>

              <div className="info-item">
                <Clock size={20} className="info-item-icon" />
                <div>
                  <strong>Showroom Visiting Hours</strong>
                  <p>Monday to Saturday &bull; 11:00 AM – 8:30 PM PKT</p>
                  <p className="dim-text">Sunday by private appointment only</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="whatsapp-help-box">
              <Sparkles size={20} className="wa-icon" />
              <div>
                <h4>Instant Styling Consultation</h4>
                <p>Have quick sizing questions before placing an order? Chat directly with our atelier stylists.</p>
                <a 
                  href="https://wa.me/923216548372" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="wa-link-btn"
                >
                  Start WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <section className="contact-faq-section">
          <div className="faq-header">
            <span className="faq-eyebrow">Frequently Asked</span>
            <h2 className="faq-title">Questions & Answers</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className={`faq-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button 
                    className="faq-trigger"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-text">{faq.q}</span>
                    <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotated' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
