import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Home, 
  ShoppingBag, 
  BookOpen,
  Heart, 
  Grid
} from 'lucide-react';
import './MobileBottomNav.css';

const MobileBottomNav = ({ currentPage, onNavigatePage }) => {
  const { 
    totalCartCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    isCheckoutOpen
  } = useShop();

  // Hide bottom nav when checkout is open to prevent UI clashing
  if (isCheckoutOpen) return null;

  const handlePageClick = (pageName) => {
    if (onNavigatePage) {
      onNavigatePage(pageName);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <button 
        className={`mobile-nav-item ${currentPage === 'home' ? 'is-active' : ''}`} 
        onClick={() => handlePageClick('home')}
        aria-label="Home"
      >
        <Home size={19} />
        <span className="mobile-nav-label">Home</span>
      </button>

      <button 
        className={`mobile-nav-item ${currentPage === 'shop' ? 'is-active' : ''}`} 
        onClick={() => handlePageClick('shop')}
        aria-label="Shop"
      >
        <Grid size={19} />
        <span className="mobile-nav-label">Shop</span>
      </button>

      <button 
        className={`mobile-nav-item ${currentPage === 'articles' ? 'is-active' : ''}`} 
        onClick={() => handlePageClick('articles')}
        aria-label="Articles"
      >
        <div className="mobile-icon-badge-wrap">
          <BookOpen size={19} />
          <span className="articles-dot-pulse"></span>
        </div>
        <span className="mobile-nav-label">Journal</span>
      </button>

      <button 
        className="mobile-nav-item" 
        onClick={() => setIsWishlistOpen(true)}
        aria-label="Wishlist"
      >
        <div className="mobile-icon-badge-wrap">
          <Heart size={19} />
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
          <ShoppingBag size={19} />
          {totalCartCount > 0 && (
            <span className="mobile-nav-badge cart-badge">{totalCartCount}</span>
          )}
        </div>
        <span className="mobile-nav-label">Bag</span>
      </button>
    </nav>
  );
};

export default MobileBottomNav;
