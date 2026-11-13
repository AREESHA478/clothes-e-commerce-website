import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  PhoneCall, 
  Sparkles,
  Globe,
  ChevronDown,
  User as UserIcon,
  Truck,
  Package,
  LogOut,
  MapPin,
  Award
} from 'lucide-react';
import './Header.css';

const Header = ({ onNavigateCategory }) => {
  const { 
    totalCartCount, 
    cartSubtotal, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen,
    currency,
    setCurrency,
    formatPrice,
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (category) => {
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
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const userInitial = user ? user.name.charAt(0).toUpperCase() : null;

  return (
    <header className={`header-root ${isScrolled ? 'header-scrolled' : ''}`}>
      {/* Top Luxury Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="container top-announcement-content">
          <div className="announcement-left">
            <span className="announcement-badge">
              <Sparkles size={12} className="sparkle-icon" />
              Autumn Capsule
            </span>
            <p className="announcement-text">
              Complimentary Express Delivery over Rs. 10,000 &bull; Code: <strong className="promo-highlight">OLIVE10</strong> (10% OFF)
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
          <div className="brand-logo" onClick={() => handleNavClick('All')}>
            <span className="brand-name">OLIVÉRA</span>
            <span className="brand-tagline">ATELIER &bull; COUTURE</span>
          </div>

          {/* Streamlined Desktop Nav Links (5 uncluttered items) */}
          <ul className="nav-links">
            <li>
              <button onClick={() => handleNavClick('Women')} className="nav-item">
                Women
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('Men')} className="nav-item">
                Men
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('Co-ords')} className="nav-item">
                Linen & Co-ords
              </button>
            </li>
            <li>
              <a href="#lookbook" className="nav-item">
                The Edit
              </a>
            </li>
            <li>
              <button onClick={() => handleNavClick('Sale')} className="nav-item nav-item-sale">
                Sale <span className="nav-sale-pill">-25%</span>
              </button>
            </li>
          </ul>

          {/* Right Action Icons (Sleek, uncluttered icon buttons) */}
          <div className="navbar-actions">
            {/* Search Trigger */}
            <button 
              className="action-icon-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search items"
              title="Search collection"
            >
              <Search size={19} />
            </button>

            {/* Wishlist Trigger */}
            <button 
              className="action-icon-btn wishlist-action-btn"
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist"
              title="Saved items"
            >
              <div className="icon-with-badge">
                <Heart size={19} />
                {wishlist.length > 0 && (
                  <span className="action-badge-count">{wishlist.length}</span>
                )}
              </div>
            </button>

            {/* Cart Trigger (Sleek luxury icon button with badge) */}
            <button 
              className="action-icon-btn cart-icon-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              title="View Shopping Bag"
            >
              <div className="icon-with-badge">
                <ShoppingBag size={19} />
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
                        <button onClick={() => handleOpenAccountTab('perks')}>
                          <Award size={15} />
                          <span>Privé Perks ({user.loyaltyPoints} pts)</span>
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
                  <UserIcon size={19} />
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
            <button onClick={() => setMobileMenuOpen(false)} className="close-menu-btn">
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
                  <span className="tier">{user.tier} &bull; {user.loyaltyPoints} Points</span>
                </div>
                <button className="btn btn-sm btn-outline-olive">My Profile</button>
              </div>
            ) : (
              <div className="mobile-signin-prompt">
                <p>Access exclusive capsule drops & orders</p>
                <div className="mobile-auth-btns">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAuthClick('login')}
                  >
                    Sign In
                  </button>
                  <button 
                    className="btn btn-outline-olive btn-sm"
                    onClick={() => handleAuthClick('register')}
                  >
                    Register
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mobile-menu-links">
            <button onClick={() => handleNavClick('All')}>All Collection</button>
            <button onClick={() => handleNavClick('Women')}>Women’s Atelier</button>
            <button onClick={() => handleNavClick('Men')}>Men’s Sartorial</button>
            <button onClick={() => handleNavClick('Co-ords')}>Linen & Co-ords</button>
            <button onClick={() => handleNavClick('Festive')}>Festive Occasion</button>
            <a href="#lookbook" onClick={() => setMobileMenuOpen(false)}>The Editorial Edit</a>
            <button onClick={() => handleNavClick('Sale')} className="mobile-sale-link">
              Autumn Sale (Up to 25% OFF)
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
            <p className="mobile-concierge">Concierge: +92 321 OLIVÉRA</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

