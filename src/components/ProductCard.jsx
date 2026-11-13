import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isWishlisted, 
    setQuickViewProduct 
  } = useShop();

  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors && product.colors[0] ? product.colors[0].name : 'Default');
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isSaved = isWishlisted(product.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  // Select image based on hover state if multiple images exist
  const currentImage = (isHovered && product.images && product.images[1]) 
    ? product.images[1] 
    : product.images[0];

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setQuickViewProduct(product)}
    >
      {/* Product Image Frame */}
      <div className="product-image-container">
        <img 
          src={currentImage} 
          alt={product.name} 
          className="product-image"
          loading="lazy"
        />

        {/* Badges */}
        <div className="product-badges">
          {product.isSale && (
            <span className="badge badge-sale">{product.discount}</span>
          )}
          {product.isNew && (
            <span className="badge badge-olive">New In</span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="badge badge-gold">Bestseller</span>
          )}
        </div>

        {/* Quick Action Buttons (Wishlist & Quick View) */}
        <div className="product-card-actions">
          <button 
            className={`card-action-btn wishlist-btn ${isSaved ? 'is-active heart-pop' : ''}`}
            onClick={handleWishlistClick}
            aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
            title={isSaved ? 'Saved to Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={18} fill={isSaved ? '#3A4D39' : 'none'} color={isSaved ? '#3A4D39' : '#1c261b'} />
          </button>

          <button 
            className="card-action-btn quick-view-btn"
            onClick={handleQuickViewClick}
            aria-label="Quick View"
            title="Quick View Details"
          >
            <Eye size={18} />
          </button>
        </div>

        {/* Quick Add Overlay Bar on Card Bottom */}
        <div className="quick-add-tray">
          <button 
            className={`btn-quick-add ${addedAnimation ? 'added-success' : ''}`}
            onClick={handleQuickAdd}
          >
            {addedAnimation ? (
              <>
                <Check size={16} />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                <span>Quick Add &bull; {selectedSize}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Info & Pricing */}
      <div className="product-info">
        <div className="product-top-row">
          <span className="product-category">{product.gender} &bull; {product.category}</span>
          <div className="product-rating">
            <Star size={13} fill="#c5a059" color="#c5a059" />
            <span className="rating-value">{product.rating}</span>
            <span className="rating-count">({product.reviewsCount})</span>
          </div>
        </div>

        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="color-swatches" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color) => (
              <span 
                key={color.name}
                className={`color-dot ${selectedColor === color.name ? 'selected-dot' : ''}`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                onClick={() => setSelectedColor(color.name)}
              />
            ))}
            <span className="selected-color-name">{selectedColor}</span>
          </div>
        )}

        {/* Sizes Pills */}
        {product.sizes && (
          <div className="size-pills" onClick={(e) => e.stopPropagation()}>
            {product.sizes.map((size) => (
              <button 
                key={size}
                className={`size-pill ${selectedSize === size ? 'active-size' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {/* Price Row */}
        <div className="product-price-row">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="original-price">{formatPrice(product.originalPrice)}</span>
          )}
          {product.stock <= 8 && (
            <span className="low-stock-alert">Only {product.stock} left</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
