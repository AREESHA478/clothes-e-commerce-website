import React, { useState } from 'react';
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
  ShieldCheck
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

  return (
    <div className="auth-overlay overlay-backdrop" onClick={() => setIsAuthModalOpen(false)}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="auth-header">
          <div className="auth-brand-badge">
            <Sparkles size={14} className="gold-sparkle" />
            <span>OLIVÉRA PRIVÉ MEMBERSHIP</span>
          </div>

          <button 
            className="modal-close-btn"
            onClick={() => setIsAuthModalOpen(false)}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="auth-tabs-row">
          <button 
            className={`auth-tab-btn ${authModalTab === 'login' ? 'active' : ''}`}
            onClick={() => { setAuthModalTab('login'); setResetSent(false); }}
          >
            Sign In
          </button>
          <button 
            className={`auth-tab-btn ${authModalTab === 'register' ? 'active' : ''}`}
            onClick={() => { setAuthModalTab('register'); setResetSent(false); }}
          >
            Create Account
          </button>
        </div>

        {/* Modal Body */}
        <div className="auth-modal-body">
          {/* 1-CLICK DEMO LOGIN BANNER */}
          {authModalTab === 'login' && (
            <div className="demo-login-box">
              <div className="demo-login-info">
                <span className="demo-tag">Instant Demo Access</span>
                <p>Sign in instantly as <strong>Fatima Zahra</strong> (VIP Gold Member) to test all member features.</p>
              </div>
              <button 
                type="button" 
                className="btn btn-demo-login"
                onClick={handleDemoLogin}
              >
                <span>⚡ 1-Click VIP Sign In</span>
              </button>
            </div>
          )}

          {/* SIGN IN FORM */}
          {authModalTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="auth-form animate-fade">
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="email" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. fatima.zahra@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="label-with-action">
                  <label>Password</label>
                  <button 
                    type="button" 
                    className="forgot-link-btn"
                    onClick={() => setAuthModalTab('forgot')}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button 
                    type="button" 
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg auth-submit-btn">
                <span>Sign In To Atelier</span>
                <ArrowRight size={18} />
              </button>

              <div className="auth-divider">
                <span>or continue with</span>
              </div>

              <div className="social-auth-grid">
                <button 
                  type="button" 
                  className="social-auth-btn"
                  onClick={() => login('google.user@gmail.com', 'demo')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Google</span>
                </button>

                <button 
                  type="button" 
                  className="social-auth-btn"
                  onClick={() => login('apple.vip@privilege.com', 'demo')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.64 1.35-.57.65-1.07 1.73-.93 2.76 1.01.08 2.02-.51 2.64-1.26z"/>
                  </svg>
                  <span>Apple ID</span>
                </button>
              </div>

              <p className="auth-footer-prompt">
                New to OLIVÉRA?{' '}
                <button 
                  type="button" 
                  className="switch-tab-link"
                  onClick={() => setAuthModalTab('register')}
                >
                  Create an account
                </button>
              </p>
            </form>
          )}

          {/* REGISTER FORM */}
          {authModalTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="auth-form animate-fade">
              <div className="privilege-welcome-banner">
                <Sparkles size={16} />
                <span>Join Privé Club & Receive <strong>+200 Welcome Loyalty Points</strong> (Rs. 400 instant credit)</span>
              </div>

              <div className="form-group">
                <label>Full Legal Name *</label>
                <div className="input-with-icon">
                  <UserIcon size={18} className="input-icon" />
                  <input 
                    type="text" 
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="e.g. Zainab Ahmed"
                    required
                  />
                </div>
              </div>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label>Email Address *</label>
                  <div className="input-with-icon">
                    <Mail size={18} className="input-icon" />
                    <input 
                      type="email" 
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="zainab@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>WhatsApp / Phone</label>
                  <div className="input-with-icon">
                    <Phone size={18} className="input-icon" />
                    <input 
                      type="tel" 
                      value={registerPhone}
                      onChange={(e) => setRegisterPhone(e.target.value)}
                      placeholder="0321-1234567"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Create Secure Password *</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                  />
                  <button 
                    type="button" 
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="terms-checkbox-row">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked required />
                  <span>I agree to OLIVÉRA’s Terms of Atelier Service and Privacy Policy.</span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg auth-submit-btn">
                <span>Create Privé Account</span>
                <ArrowRight size={18} />
              </button>

              <p className="auth-footer-prompt">
                Already have an account?{' '}
                <button 
                  type="button" 
                  className="switch-tab-link"
                  onClick={() => setAuthModalTab('login')}
                >
                  Sign In
                </button>
              </p>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {authModalTab === 'forgot' && (
            <div className="forgot-password-view animate-fade">
              {!resetSent ? (
                <form onSubmit={handleForgotSubmit} className="auth-form">
                  <h3 className="forgot-title">Reset Your Atelier Password</h3>
                  <p className="forgot-subtitle">
                    Enter the email address associated with your account, and our concierge team will send you a secure one-time password reset link.
                  </p>

                  <div className="form-group">
                    <label>Account Email</label>
                    <div className="input-with-icon">
                      <Mail size={18} className="input-icon" />
                      <input 
                        type="email" 
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="e.g. fatima.zahra@example.com"
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block btn-lg">
                    Send Password Recovery Link
                  </button>

                  <button 
                    type="button" 
                    className="back-to-login-btn"
                    onClick={() => setAuthModalTab('login')}
                  >
                    &larr; Back to Sign In
                  </button>
                </form>
              ) : (
                <div className="reset-sent-success">
                  <CheckCircle2 size={48} className="success-icon" />
                  <h3>Recovery Link Dispatched</h3>
                  <p>
                    We have dispatched password recovery instructions to <strong>{forgotEmail}</strong>. Please check your inbox and spam folder.
                  </p>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => { setAuthModalTab('login'); setResetSent(false); }}
                  >
                    Return to Sign In
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Guarantee */}
        <div className="auth-modal-footer">
          <ShieldCheck size={16} />
          <span>256-Bit SSL Atelier Encryption &bull; Certified Secure</span>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
