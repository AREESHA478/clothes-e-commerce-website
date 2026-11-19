import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  Ruler, 
  ChevronDown, 
  ChevronUp, 
  Plus,
  Minus
} from 'lucide-react';
import './QuickViewModal.css';

// Subcomponent that mounts fresh whenever a new product is selected
const QuickViewModalContent = ({ product, onClose }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isWishlisted, 
    formatPrice,
    setIsSizeGuideOpen,
    setIsCheckoutOpen,
    productReviews,
    addProductReview,
    user
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard'
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : 'Default'
  );
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('details');

  // Reviews state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const isSaved = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
    setIsCheckoutOpen(true);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    addProductReview(product.id, {
      author: user ? user.name : 'Valued Client',
      rating: reviewRating,
      comment: reviewComment.trim()
    });
    setReviewComment('');
  };

  return (
    <div className="quickview-overlay" onClick={onClose}>
      <div className="quickview-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        <div className="quickview-grid">
          {/* Left Gallery */}
          <div className="quickview-gallery">
            <div className="main-display-frame">
              <img 
                src={(product.images && product.images[activeImageIndex]) || product.images?.[0] || ''} 
                alt={product.name} 
                className="main-display-img"
              />
              {product.discount && (
                <span className="badge badge-sale modal-discount-pill">
                  {product.discount}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images && product.images.length > 1 && (
              <div className="gallery-thumbnails">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${activeImageIndex === idx ? 'thumb-active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Particulars */}
          <div className="quickview-info">
            <div className="quickview-category-row">
              <span className="quickview-cat-badge">
                {product.gender} &bull; {product.category}
              </span>
              <div className="quickview-ratings">
                <Star size={15} fill="#c5a059" color="#c5a059" />
                <span className="rating-score">{product.rating}</span>
                <span className="rating-reviews">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="quickview-title">{product.name}</h2>

            {/* Price Row */}
            <div className="quickview-price-row">
              <span className="quickview-price">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="quickview-original-price">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.isSale && (
                <span className="savings-tag">Special Autumn Price</span>
              )}
            </div>

            <p className="quickview-description">
              {product.description}
            </p>

            {/* Color Swatch Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="modal-option-group">
                <label className="option-label">
                  Selected Shade: <strong>{selectedColor}</strong>
                </label>
                <div className="modal-color-swatches">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      className={`modal-color-circle ${selectedColor === c.name ? 'is-active' : ''}`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector + Size Guide Link */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="modal-option-group">
                <div className="size-label-row">
                  <label className="option-label">
                    Size: <strong>{selectedSize}</strong>
                  </label>
                  <button 
                    className="size-guide-trigger"
                    onClick={() => setIsSizeGuideOpen(true)}
                  >
                    <Ruler size={14} />
                    <span>View Size Chart</span>
                  </button>
                </div>

                <div className="modal-size-pills">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      className={`modal-size-pill ${selectedSize === s ? 'size-active' : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="modal-action-row">
              <div className="modal-qty-counter">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="counter-btn"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="counter-val">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="counter-btn"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button 
                className="btn btn-primary modal-add-cart-btn"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                <span>Add To Atelier Bag</span>
              </button>

              <button 
                className={`modal-wishlist-toggle ${isSaved ? 'is-saved heart-pop' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                title={isSaved ? 'In Wishlist' : 'Add to Wishlist'}
              >
                <Heart size={20} fill={isSaved ? '#3A4D39' : 'none'} color={isSaved ? '#3A4D39' : '#1c261b'} />
              </button>
            </div>

            {/* Instant Buy Now Button */}
            <button 
              className="btn btn-cream btn-buy-now"
              onClick={handleBuyNow}
            >
              <span>Instant Checkout &bull; {formatPrice(product.price * quantity)}</span>
            </button>

            {/* Accordion Tabs */}
            <div className="modal-accordions">
              {/* Accordion 1 */}
              <div className="accordion-item">
                <button 
                  className="accordion-header"
                  onClick={() => setOpenAccordion(openAccordion === 'details' ? '' : 'details')}
                >
                  <span>Composition & Handcrafted Details</span>
                  {openAccordion === 'details' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'details' && (
                  <div className="accordion-content animate-fade">
                    <ul className="details-bullet-list">
                      {product.details ? (
                        product.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))
                      ) : (
                        <li>100% sustainably sourced organic natural fibers.</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2 */}
              <div className="accordion-item">
                <button 
                  className="accordion-header"
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')}
                >
                  <span>Delivery & Complimentary Returns</span>
                  {openAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="accordion-content animate-fade">
                    <p>
                      Dispatched within 24 hours from our Lahore and Karachi ateliers. 
                      Standard delivery takes 2-3 business days. Free returns and size swaps 
                      picked up from your door within 30 days.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Customer Reviews */}
              <div className="accordion-item">
                <button 
                  className="accordion-header"
                  onClick={() => setOpenAccordion(openAccordion === 'reviews' ? '' : 'reviews')}
                >
                  <span>Client Reviews & Verified Ratings</span>
                  {openAccordion === 'reviews' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'reviews' && (
                  <div className="accordion-content reviews-accordion-content animate-fade">
                    <div className="modal-reviews-list">
                      {((productReviews && productReviews[product.id]) || [
                        {
                          id: 'rev-default-1',
                          author: 'Areeba S.',
                          rating: 5,
                          date: '3 days ago',
                          verified: true,
                          comment: 'Exquisite silhouette and premium texture. The tailoring fits like a bespoke dream.'
                        },
                        {
                          id: 'rev-default-2',
                          author: 'Dr. Sarah K.',
                          rating: 5,
                          date: '1 week ago',
                          verified: true,
                          comment: 'Fast express delivery in Lahore. Fabric has an understated royal drape.'
                        }
                      ]).map((rev) => (
                        <div key={rev.id} className="review-entry-box">
                          <div className="review-entry-header">
                            <span className="review-author">{rev.author}</span>
                            {rev.verified && <span className="verified-buyer-badge">Verified Buyer</span>}
                            <span className="review-date">{rev.date}</span>
                          </div>
                          <div className="review-stars-row">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={12} 
                                fill={i < rev.rating ? '#c5a059' : 'none'} 
                                color="#c5a059" 
                              />
                            ))}
                          </div>
                          <p className="review-text">{rev.comment}</p>
                        </div>
                      ))}
                    </div>

                    <div className="write-review-card">
                      <h6>Share Your Feedback</h6>
                      <div className="rating-select-row">
                        <label>Your Rating:</label>
                        <div className="stars-picker">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              key={num}
                              type="button"
                              className={`star-pick-btn ${reviewRating >= num ? 'active' : ''}`}
                              onClick={() => setReviewRating(num)}
                            >
                              <Star size={18} fill={reviewRating >= num ? '#c5a059' : 'none'} color="#c5a059" />
                            </button>
                          ))}
                        </div>
                      </div>

                      <textarea 
                        placeholder="Write your thoughts about the fit, texture, and tailoring..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows="2"
                        className="review-textarea"
                      />

                      <button 
                        type="button" 
                        className="btn btn-outline-olive btn-sm btn-submit-review"
                        onClick={handleSubmitReview}
                      >
                        Publish Verified Review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct } = useShop();

  if (!quickViewProduct) return null;

  const modalElement = (
    <QuickViewModalContent 
      key={quickViewProduct.id}
      product={quickViewProduct} 
      onClose={() => setQuickViewProduct(null)} 
    />
  );

  return typeof document !== 'undefined'
    ? createPortal(modalElement, document.body)
    : modalElement;
};

export default QuickViewModal;
