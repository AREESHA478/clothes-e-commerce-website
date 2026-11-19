import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Lock, 
  Mail, 
  User as UserIcon, 
  Phone, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  Award
} from 'lucide-react';
import './AuthModal.css';

const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalTab, 
    setAuthModalTab, 
    login, 
    register, 
    showToast 
  } = useShop();

  const [showPassword, setShowPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Form states
  const [loginEmail, setLoginEmail] = useState('fatima.zahra@example.com');
  const [loginPassword, setLoginPassword] = useState('••••••••••••');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [forgotEmail, setForgotEmail] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail) {
      showToast('Please enter your email address', 'error');
      return;
    }
    login(loginEmail, loginPassword);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    register({
      name: registerName,
      email: registerEmail,
      phone: registerPhone,
      password: registerPassword
    });
  };

  const handleDemoLogin = () => {
    login('fatima.zahra@example.com', 'password123');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      showToast('Please enter your email address', 'error');
      return;
    }
    setResetSent(true);
    showToast(`Password recovery link sent to ${forgotEmail}`, 'success');
  };

  const modalNode = (
    <div className="auth-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div 
        className="auth-modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button 
          className="auth-close-btn"
          onClick={() => setIsAuthModalOpen(false)}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Left Side: Atelier Editorial Showcase */}
        <div className="auth-editorial-side">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80" 
            alt="OLIVÉRA Sartorial Atelier" 
            className="auth-editorial-bg"
          />
          <div className="auth-editorial-overlay"></div>

          <div className="auth-editorial-content">
            <div className="auth-atelier-seal">
              <Sparkles size={14} />
              <span>OLIVÉRA CLIENT MEMBERSHIP</span>
            </div>

            <div className="auth-editorial-body">
              <h2 className="auth-editorial-heading">
                The Art of <em>Enduring Wardrobes</em>
              </h2>
              <blockquote className="auth-editorial-quote">
                &ldquo;True luxury is never hurried. Every thread is selected with reverence, tailored to outlive passing trends.&rdquo;
              </blockquote>

              <div className="auth-features-list">
                <div className="auth-perk-item">
                  <Sparkles size={15} />
                  <span>Complimentary express delivery & archival gift box</span>
                </div>
                <div className="auth-perk-item">
                  <Award size={15} />
                  <span>Private previews for seasonal micro-capsule releases</span>
                </div>
                <div className="auth-perk-item">
                  <ShieldCheck size={15} />
                  <span>Lifetime care advice & bespoke tailoring consultations</span>
                </div>
              </div>
            </div>

            <div className="auth-editorial-footer">
              <span>Atelier Sartorial &bull; Lahore & Paris</span>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Aesthetic Form */}
        <div className="auth-form-side">
          {/* Header Title */}
          <div className="auth-form-header">
            <span className="auth-eyebrow">Client Portal</span>
            <h3 className="auth-form-title">
              {authModalTab === 'login' && 'Welcome Back'}
              {authModalTab === 'register' && 'Join the Atelier'}
              {authModalTab === 'forgot' && 'Account Recovery'}
            </h3>
            <p className="auth-form-desc">
              {authModalTab === 'login' && 'Sign in to access your saved wardrobe, order history, and private appointments.'}
              {authModalTab === 'register' && 'Create your client profile to access order tracking, saved looks, and tailored fittings.'}
              {authModalTab === 'forgot' && 'Enter your registered email to receive an instant recovery link.'}
            </p>
          </div>

          {/* Tab Selector (Sign In vs Create Account) */}
          {authModalTab !== 'forgot' && (
            <div className="auth-pill-switcher">
              <button 
                type="button"
                className={`auth-switcher-btn ${authModalTab === 'login' ? 'active' : ''}`}
                onClick={() => { setAuthModalTab('login'); setResetSent(false); }}
              >
                Sign In
              </button>
              <button 
                type="button"
                className={`auth-switcher-btn ${authModalTab === 'register' ? 'active' : ''}`}
                onClick={() => { setAuthModalTab('register'); setResetSent(false); }}
              >
                Create Account
              </button>
            </div>
          )}

          {/* 1-CLICK INSTANT DEMO LOGIN BAR */}
          {authModalTab === 'login' && (
            <div className="auth-vip-demo-card">
              <div className="vip-demo-text">
                <strong>Instant Demo VIP:</strong> Sign in as Fatima Zahra to explore member features.
              </div>
              <button 
                type="button" 
                className="btn-vip-instant"
                onClick={handleDemoLogin}
              >
                <span>⚡ 1-Click Sign In</span>
              </button>
            </div>
          )}

          {/* ================= SIGN IN VIEW ================= */}
          {authModalTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="auth-form-flow animate-fade">
              <div className="auth-field">
                <label className="auth-field-label">Email Address</label>
                <div className="auth-input-shell">
                  <Mail size={17} className="auth-field-icon" />
                  <input 
                    type="email" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. fatima.zahra@example.com"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <div className="auth-label-row">
                  <label className="auth-field-label">Password</label>
                  <button 
                    type="button" 
                    className="auth-forgot-trigger"
                    onClick={() => setAuthModalTab('forgot')}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="auth-input-shell">
                  <Lock size={17} className="auth-field-icon" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your secure password"
                    required
                  />
                  <button 
                    type="button" 
                    className="auth-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-auth-primary">
                <span>Sign In To Atelier</span>
                <ArrowRight size={16} />
              </button>

              <div className="auth-social-divider">
                <span>or continue with</span>
              </div>

              <div className="auth-social-row">
                <button 
                  type="button" 
                  className="btn-social-auth"
                  onClick={() => login('google.user@gmail.com', 'demo')}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Google</span>
                </button>

                <button 
                  type="button" 
                  className="btn-social-auth"
                  onClick={() => login('apple.vip@privilege.com', 'demo')}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.64 1.35-.57.65-1.07 1.73-.93 2.76 1.01.08 2.02-.51 2.64-1.26z"/>
                  </svg>
                  <span>Apple ID</span>
                </button>
              </div>

              <div className="auth-switch-prompt">
                <span>New to OLIVÉRA?</span>
                <button 
                  type="button"
                  onClick={() => setAuthModalTab('register')}
                >
                  Create an account
                </button>
              </div>
            </form>
          )}

          {/* ================= REGISTER VIEW ================= */}
          {authModalTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="auth-form-flow animate-fade">
              <div className="auth-reward-banner">
                <Sparkles size={16} />
                <span>Complimentary nationwide express delivery &amp; archival gift box on every order.</span>
              </div>

              <div className="auth-field">
                <label className="auth-field-label">Full Name *</label>
                <div className="auth-input-shell">
                  <UserIcon size={17} className="auth-field-icon" />
                  <input 
                    type="text" 
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="e.g. Zainab Ahmed"
                    required
                  />
                </div>
              </div>

              <div className="auth-two-cols">
                <div className="auth-field">
                  <label className="auth-field-label">Email Address *</label>
                  <div className="auth-input-shell">
                    <Mail size={17} className="auth-field-icon" />
                    <input 
                      type="email" 
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="zainab@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-field-label">WhatsApp / Phone</label>
                  <div className="auth-input-shell">
                    <Phone size={17} className="auth-field-icon" />
                    <input 
                      type="tel" 
                      value={registerPhone}
                      onChange={(e) => setRegisterPhone(e.target.value)}
                      placeholder="0321-1234567"
                    />
                  </div>
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-field-label">Create Secure Password *</label>
                <div className="auth-input-shell">
                  <Lock size={17} className="auth-field-icon" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                  />
                  <button 
                    type="button" 
                    className="auth-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div className="auth-terms-row">
                <label className="auth-checkbox-label">
                  <input type="checkbox" defaultChecked required />
                  <span>I agree to OLIVÉRA’s Terms of Atelier Service &amp; Privacy Policy.</span>
                </label>
              </div>

              <button type="submit" className="btn-auth-primary">
                <span>Create Atelier Account</span>
                <ArrowRight size={16} />
              </button>

              <div className="auth-switch-prompt">
                <span>Already have an account?</span>
                <button 
                  type="button"
                  onClick={() => setAuthModalTab('login')}
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          {/* ================= FORGOT PASSWORD VIEW ================= */}
          {authModalTab === 'forgot' && (
            <div className="forgot-view-shell animate-fade">
              {!resetSent ? (
                <form onSubmit={handleForgotSubmit} className="auth-form-flow">
                  <p>
                    Please provide the email address associated with your atelier account. 
                    Our concierge team will send you a secure one-time password reset link.
                  </p>

                  <div className="auth-field">
                    <label className="auth-field-label">Registered Email</label>
                    <div className="auth-input-shell">
                      <Mail size={17} className="auth-field-icon" />
                      <input 
                        type="email" 
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="e.g. fatima.zahra@example.com"
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-auth-primary">
                    <span>Send Password Recovery Link</span>
                    <ArrowRight size={16} />
                  </button>

                  <button 
                    type="button" 
                    className="btn-back-login"
                    onClick={() => setAuthModalTab('login')}
                  >
                    <ArrowLeft size={14} />
                    <span>Return to Sign In</span>
                  </button>
                </form>
              ) : (
                <div className="forgot-dispatched-card">
                  <CheckCircle2 size={44} color="#3D4A3D" />
                  <h3>Recovery Link Dispatched</h3>
                  <p>
                    Instructions have been sent to <strong>{forgotEmail}</strong>. 
                    Please check your inbox or spam folder within the next few minutes.
                  </p>
                  <button 
                    type="button" 
                    className="btn-auth-primary"
                    onClick={() => { setAuthModalTab('login'); setResetSent(false); }}
                  >
                    Back to Sign In
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Footer Security Seal */}
          <div className="auth-security-guarantee">
            <ShieldCheck size={14} />
            <span>256-Bit SSL Atelier Encryption &bull; Certified Private &amp; Secure</span>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalNode, document.body)
    : modalNode;
};

export default AuthModal;
