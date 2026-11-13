import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Home, 
  Search, 
  Heart, 
  ShoppingBag, 
  User 
} from 'lucide-react';
import './MobileBottomNav.css';

const MobileBottomNav = ({ onHomeClick }) => {
  const { 
    totalCartCount, 
    wishlist, 
    user, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen, 
    setIsAccountOpen, 
    setIsAuthModalOpen,
    isCheckoutOpen
  } = useShop();

  // Hide bottom nav when checkout is open to prevent UI clashing
  if (isCheckoutOpen) return null;

  const handleAccountClick = () => {
    if (user) {
      setIsAccountOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const userInitial = user ? user.name.charAt(0).toUpperCase() : null;

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <button 
        className="mobile-nav-item" 
        onClick={handleHomeClick}
        aria-label="Home"
      >
        <Home size={20} />
        <span className="mobile-nav-label">Shop</span>
      </button>

      <button 
        className="mobile-nav-item" 
        onClick={() => setIsSearchOpen(true)}
        aria-label="Search"
      >
        <Search size={20} />
        <span className="mobile-nav-label">Search</span>
      </button>

      <button 
        className="mobile-nav-item" 
        onClick={() => setIsWishlistOpen(true)}
        aria-label="Wishlist"
      >
        <div className="mobile-icon-badge-wrap">
          <Heart size={20} />
          {wishlist.length > 0 && (
            <span className="mobile-nav-badge">{wishlist.length}</span>
          )}
        </div>
        <span className="mobile-nav-label">Wishlist</span>
      </button>

      <button 
        className="mobile-nav-item" 
        onClick={() => setIsCartOpen(true)}
        aria-label="Cart"
      >
        <div className="mobile-icon-badge-wrap">
          <ShoppingBag size={20} />
          {totalCartCount > 0 && (
            <span className="mobile-nav-badge cart-badge">{totalCartCount}</span>
          )}
        </div>
        <span className="mobile-nav-label">Bag</span>
      </button>

      <button 
        className="mobile-nav-item" 
        onClick={handleAccountClick}
        aria-label="Account Profile"
      >
        {user ? (
          <div className="mobile-user-avatar">
            <span>{userInitial}</span>
          </div>
        ) : (
          <User size={20} />
        )}
        <span className="mobile-nav-label">{user ? 'Account' : 'Sign In'}</span>
      </button>
    </nav>
  );
};

export default MobileBottomNav;
