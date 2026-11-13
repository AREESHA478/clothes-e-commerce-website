import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import './WishlistDrawer.css';

const WishlistDrawer = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    toggleWishlist, 
    products, 
    addToCart, 
    formatPrice,
    showToast 
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToBag = () => {
    wishlistedProducts.forEach((p) => {
      addToCart(p, p.sizes ? p.sizes[0] : 'Standard', p.colors ? p.colors[0]?.name : 'Default', 1);
    });
    showToast('Moved all wishlist items to bag!', 'success');
  };

  return (
    <div className="wishlist-overlay overlay-backdrop" onClick={() => setIsWishlistOpen(false)}>
      <div className="wishlist-drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="wishlist-header">
          <div className="wishlist-title-wrap">
            <Heart size={20} className="wishlist-heart-icon" />
            <h3 className="wishlist-title">Saved Creations</h3>
            <span className="wishlist-count">({wishlistedProducts.length})</span>
          </div>
          <button 
            className="drawer-close-btn"
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist drawer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content Body */}
        <div className="wishlist-body">
          {wishlistedProducts.length > 0 ? (
            <div className="wishlist-items-list">
              {wishlistedProducts.map((product) => (
                <div key={product.id} className="wishlist-item-card">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="wishlist-item-img"
                  />

                  <div className="wishlist-item-info">
                    <span className="wishlist-item-cat">{product.gender} &bull; {product.category}</span>
                    <h4 className="wishlist-item-name">{product.name}</h4>
                    
                    <div className="wishlist-item-price-row">
                      <span className="wishlist-current-price">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="wishlist-old-price">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>

                    <div className="wishlist-item-actions">
                      <button 
                        className="btn-move-to-cart"
                        onClick={() => {
                          addToCart(product, product.sizes ? product.sizes[0] : 'Standard', product.colors ? product.colors[0]?.name : 'Default', 1);
                        }}
                      >
                        <ShoppingBag size={14} />
                        <span>Add to Bag</span>
                      </button>

                      <button 
                        className="btn-remove-wishlist"
                        onClick={() => toggleWishlist(product.id)}
                        title="Remove from saved"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-wishlist-state">
              <div className="empty-heart-icon">🌿</div>
              <h4 className="empty-wishlist-title">Your wishlist is empty</h4>
              <p className="empty-wishlist-desc">
                Save pieces you admire while browsing to keep track of your seasonal wardrobe wishlist.
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => setIsWishlistOpen(false)}
              >
                Browse Collections
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistedProducts.length > 0 && (
          <div className="wishlist-footer">
            <button 
              className="btn btn-primary btn-lg move-all-btn"
              onClick={handleMoveAllToBag}
            >
              <span>Move All to Bag</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistDrawer;
