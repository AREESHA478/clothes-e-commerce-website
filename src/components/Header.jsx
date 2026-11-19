import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  Sparkles,
  Globe,
  ChevronDown,
  User as UserIcon,
  Truck,
  Package,
  LogOut,
  MapPin
} from 'lucide-react';
import './Header.css';

const Header = ({ currentPage, onNavigatePage, onNavigateCategory }) => {
  const { 
    totalCartCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen,
    currency,
    setCurrency,
    user,
    logout,
    setIsAuthModalOpen,
    setAuthModalTab,
    setIsAccountOpen,
    setActiveAccountTab,
    setIsOrderTrackingOpen
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [fontTheme, setFontTheme] = useState('editorial');

  const handleFontChange = (theme) => {
    setFontTheme(theme);
    if (theme === 'clean-sans') {
      document.documentElement.setAttribute('data-theme-font', 'clean-sans');
    } else {
      document.documentElement.removeAttribute('data-theme-font');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePageClick = (pageName) => {
    if (onNavigatePage) {
      onNavigatePage(pageName);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (category) => {
    if (onNavigateCategory) {
      onNavigateCategory(category);
    }
    setMobileMenuOpen(false);
  };

  const handleOpenAccountTab = (tab) => {
    setActiveAccountTab(tab);
    setIsAccountOpen(true);
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleAuthClick = (tab = 'login') => {
    if (currentPage === 'login' || currentPage === 'register') {
      if (onNavigatePage) {
        onNavigatePage(tab);
      }
    } else {
      setAuthModalTab(tab);
      setIsAuthModalOpen(true);
    }
    setMobileMenuOpen(false);
  };

  const userInitial = user ? user.name.charAt(0).toUpperCase() : null;

  return (
    <header className={`header-root ${isScrolled ? 'header-scrolled' : ''}`}>
      {/* Top Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="container top-announcement-content">
          <div className="announcement-left">
            <span className="announcement-badge">
              <Sparkles size={11} className="sparkle-icon" />
              Autumn / Winter 2026
            </span>
            <p className="announcement-text">
              Complimentary Express Delivery on orders over Rs. 10,000 &bull; Use code <strong className="promo-highlight">OLIVE10</strong>
            </p>
          </div>

          <div className="announcement-right">
            <button 
              type="button" 
              className="top-track-btn" 
              onClick={() => setIsOrderTrackingOpen(true)}
              title="Track your order status"
            >
              <Truck size={13} />
              <span>Track Order</span>
            </button>

            <div className="currency-selector">
              <Globe size={13} />
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                aria-label="Currency"
              >
                <option value="PKR">PKR (Rs.)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>

            <div className="font-theme-selector">
              <select 
                value={fontTheme} 
                onChange={(e) => handleFontChange(e.target.value)}
                aria-label="Font Style"
                title="Change font pairing"
              >
                <option value="editorial">Font: Editorial Serif</option>
                <option value="clean-sans">Font: Modern Sans</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="main-navbar">
        <div className="container navbar-container">
          {/* Mobile Menu Button */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Brand Logo */}
          <div className="brand-logo" onClick={() => handlePageClick('home')}>
            <span className="brand-name">OLIVÉRA</span>
            <span className="brand-tagline">ATELIER &bull; COUTURE</span>
          </div>

          {/* Clean Aesthetic Desktop Nav Links */}
          <ul className="nav-links">
            <li>
              <button 
                onClick={() => handlePageClick('home')} 
                className={`nav-item ${currentPage === 'home' ? 'is-active' : ''}`}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => handlePageClick('shop')} 
                className={`nav-item ${currentPage === 'shop' ? 'is-active' : ''}`}
              >
                Shop
              </button>
            </li>
            <li>
              <button 
                onClick={() => handlePageClick('articles')} 
                className={`nav-item ${currentPage === 'articles' ? 'is-active' : ''}`}
              >
                Articles
                <span className="nav-articles-badge">Editorial</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handlePageClick('about')} 
                className={`nav-item ${currentPage === 'about' ? 'is-active' : ''}`}
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={() => handlePageClick('contact')} 
                className={`nav-item ${currentPage === 'contact' ? 'is-active' : ''}`}
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Right Action Icons */}
          <div className="navbar-actions">
            {/* Search Trigger */}
            <button 
              className="action-icon-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search items"
              title="Search collection"
            >
              <Search size={18} />
            </button>

            {/* Wishlist Trigger */}
            <button 
              className="action-icon-btn wishlist-action-btn"
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist"
              title="Saved items"
            >
              <div className="icon-with-badge">
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span className="action-badge-count">{wishlist.length}</span>
                )}
              </div>
            </button>

            {/* Cart Trigger */}
            <button 
              className="action-icon-btn cart-icon-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              title="View Shopping Bag"
            >
              <div className="icon-with-badge">
                <ShoppingBag size={18} />
                {totalCartCount > 0 && (
                  <span className="action-badge-count cart-badge">{totalCartCount}</span>
                )}
              </div>
            </button>

            {/* User Account / Profile Dropdown */}
            <div className="header-user-wrapper">
              {user ? (
                <div className="user-logged-box">
                  <button 
                    className="user-profile-trigger-btn"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    aria-label="User Account Menu"
                    title={`Signed in as ${user.name}`}
                  >
                    <div className="header-user-avatar">
                      <span>{userInitial}</span>
                    </div>
                    <ChevronDown size={13} className={`dropdown-arrow ${userDropdownOpen ? 'open' : ''}`} />
                  </button>

                  {userDropdownOpen && (
                    <div className="user-dropdown-menu animate-fade">
                      <div className="dropdown-user-header">
                        <strong>{user.name}</strong>
                        <span className="dropdown-tier-badge">{user.tier}</span>
                      </div>

                      <div className="dropdown-links-list">
                        <button onClick={() => handleOpenAccountTab('orders')}>
                          <Package size={15} />
                          <span>My Orders & History</span>
                        </button>
                        <button onClick={() => { setIsOrderTrackingOpen(true); setUserDropdownOpen(false); }}>
                          <Truck size={15} />
                          <span>Track Consignment</span>
                        </button>
                        <button onClick={() => handleOpenAccountTab('addresses')}>
                          <MapPin size={15} />
                          <span>Saved Addresses</span>
                        </button>
                        <button onClick={() => handleOpenAccountTab('profile')}>
                          <UserIcon size={15} />
                          <span>Profile & Details</span>
                        </button>
                      </div>

                      <div className="dropdown-footer">
                        <button onClick={() => { logout(); setUserDropdownOpen(false); }} className="logout-btn">
                          <LogOut size={14} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  className="action-icon-btn user-signin-btn"
                  onClick={() => handleAuthClick('login')}
                  title="Sign In / Register"
                  aria-label="Sign In"
                >
                  <UserIcon size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div className="mobile-menu-header">
            <span className="brand-name">OLIVÉRA</span>
            <button onClick={() => setMobileMenuOpen(false)} className="close-menu-btn" aria-label="Close menu">
              <X size={22} />
            </button>
          </div>

          {/* User Status Bar in Mobile Menu */}
          <div className="mobile-user-status-strip">
            {user ? (
              <div className="mobile-user-card" onClick={() => handleOpenAccountTab('orders')}>
                <div className="header-user-avatar">
                  <span>{userInitial}</span>
                </div>
                <div className="mobile-user-text">
                  <span className="name">{user.name}</span>
                  <span className="tier">{user.tier} &bull; Member</span>
                </div>
                <button className="btn btn-sm btn-outline-olive">Profile</button>
              </div>
            ) : (
              <div className="mobile-signin-prompt">
                <p>Sign in to track orders & saved items</p>
                <div className="mobile-auth-btns">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAuthClick('login')}
                  >
                    Sign In
                  </button>
                  <button 
                    className="btn btn-cream btn-sm"
                    onClick={() => handleAuthClick('register')}
                  >
                    Register
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mobile-menu-links">
            <button 
              className={currentPage === 'home' ? 'is-active' : ''} 
              onClick={() => handlePageClick('home')}
            >
              Home
            </button>
            <button 
              className={currentPage === 'shop' ? 'is-active' : ''} 
              onClick={() => handlePageClick('shop')}
            >
              Shop All Collection
            </button>
            <div className="mobile-sub-cats">
              <span onClick={() => handleCategoryClick('Women')}>&bull; Women's Atelier</span>
              <span onClick={() => handleCategoryClick('Men')}>&bull; Men's Sartorial</span>
              <span onClick={() => handleCategoryClick('Co-ords')}>&bull; Linen & Co-ords</span>
              <span onClick={() => handleCategoryClick('Sale')}>&bull; Seasonal Sale</span>
            </div>
            <button 
              className={`articles-mobile-link ${currentPage === 'articles' ? 'is-active' : ''}`}
              onClick={() => handlePageClick('articles')}
            >
              <div className="mobile-link-with-badge">
                <span>Articles & Journal</span>
                <span className="mobile-badge-new">New</span>
              </div>
            </button>
            <button 
              className={currentPage === 'about' ? 'is-active' : ''} 
              onClick={() => handlePageClick('about')}
            >
              About the Atelier
            </button>
            <button 
              className={currentPage === 'contact' ? 'is-active' : ''} 
              onClick={() => handlePageClick('contact')}
            >
              Contact & Concierge
            </button>
            <button 
              className="mobile-track-link"
              onClick={() => { setIsOrderTrackingOpen(true); setMobileMenuOpen(false); }}
            >
              <Truck size={17} />
              <span>Track Consignment Live</span>
            </button>
          </div>

          <div className="mobile-menu-footer">
            <div className="currency-selector">
              <Globe size={15} />
              <span>Currency: </span>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="PKR">PKR (Rs.)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            <div className="currency-selector">
              <span>Typography: </span>
              <select 
                value={fontTheme} 
                onChange={(e) => handleFontChange(e.target.value)}
              >
                <option value="editorial">Editorial Serif</option>
                <option value="clean-sans">Modern Sans</option>
              </select>
            </div>
            <p className="mobile-concierge">Concierge: +92 321 OLIVÉRA</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
