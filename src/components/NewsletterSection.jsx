import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Check, Sparkles, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import './NewsletterSection.css';

const NewsletterSection = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setIsSubscribed(true);
    showToast('Welcome to OLIVÉRA Privé! Your 10% discount is unlocked.', 'success');

    // Trigger subtle confetti burst
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#3A4D39', '#C5A059', '#ECE3CE', '#2A3829']
      });
    } catch (e) {
      // ignore
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('OLIVE10');
    setCopied(true);
    showToast('Coupon code OLIVE10 copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-box glass-dark">
          <div className="newsletter-decorative-leaf">🌿</div>

          <div className="newsletter-badge">
            <Sparkles size={14} />
            <span>The Privé Circle</span>
          </div>

          <h2 className="newsletter-title">
            Enter the World of OLIVÉRA
          </h2>

          <p className="newsletter-desc">
            Be the first to preview private seasonal capsules, receive invitations to 
            private atelier trunk shows, and enjoy <strong>10% off</strong> your debut order.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="newsletter-input-group">
                <Mail size={18} className="newsletter-input-icon" />
                <input 
                  type="email" 
                  placeholder="Enter your personal email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email Address for newsletter"
                />
              </div>
              <button type="submit" className="btn btn-primary newsletter-submit-btn">
                <span>Join The Atelier</span>
              </button>
            </form>
          ) : (
            <div className="newsletter-success animate-fade">
              <div className="success-icon-wrap">
                <Check size={20} />
              </div>
              <div className="success-info">
                <h4 className="success-title">Welcome to the inner circle!</h4>
                <p className="success-text">
                  Your VIP promo code is ready. Use at checkout for 10% off:
                </p>
                <div className="coupon-reveal-badge" onClick={handleCopyCode} title="Click to copy">
                  <span className="code-text">OLIVE10</span>
                  <button className="copy-btn">
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <p className="newsletter-privacy">
            We value your discretion. No spam, ever. Unsubscribe with a single click at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
