import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck,
  Truck
} from 'lucide-react';
import './CartDrawer.css';

const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal, 
    discountAmount, 
    standardShippingCost, 
    cartTotal, 
    freeShippingThreshold,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    formatPrice,
    setIsCheckoutOpen
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  // Free shipping progress calculation
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="cart-drawer-overlay overlay-backdrop" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="header-title-box">
            <ShoppingBag size={20} className="header-bag-icon" />
            <h3 className="drawer-title">Your Atelier Bag</h3>
            <span className="cart-item-count">({cart.reduce((s, i) => s + i.quantity, 0)})</span>
          </div>

          <button 
            className="drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="shipping-progress-box">
          <div className="progress-label-row">
            <Truck size={16} className="truck-icon" />
            <span className="progress-text">
              {amountNeededForFreeShipping === 0 ? (
                <strong className="free-shipping-unlocked">🎉 You unlocked Free Express Delivery!</strong>
              ) : (
                <>Add <strong>{formatPrice(amountNeededForFreeShipping)}</strong> more for <strong>Free Delivery</strong></>
              )}
            </span>
          </div>
          <div className="progress-bar-track">
            <div 
              className="progress-bar-fill"
              style={{ width: `${freeShippingPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="cart-items-body">
          {cart.length > 0 ? (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.itemKey} className="cart-item-card">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="cart-item-image"
                  />

                  <div className="cart-item-details">
                    <div className="item-name-row">
                      <h4 className="item-name">{item.product.name}</h4>
                      <button 
                        className="btn-remove-item"
                        onClick={() => removeFromCart(item.itemKey)}
                        title="Remove piece"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="item-specs">
                      <span className="spec-tag">Size: <strong>{item.size}</strong></span>
                      <span className="spec-tag">Color: <strong>{item.color}</strong></span>
                    </div>

                    <div className="item-pricing-row">
                      <div className="qty-control-box">
                        <button 
                          onClick={() => updateCartQuantity(item.itemKey, -1)}
                          className="qty-btn"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.itemKey, 1)}
                          className="qty-btn"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <span className="item-subtotal-price">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-cart-state">
              <div className="empty-bag-icon">🛍️</div>
              <h4 className="empty-bag-title">Your shopping bag is empty</h4>
              <p className="empty-bag-desc">
                Discover pieces cut in French linen and raw silk to build your timeless wardrobe.
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => setIsCartOpen(false)}
              >
                Explore Collection
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer with Coupons & Summary */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Promo Code Input / Applied Badge */}
            {!appliedCoupon ? (
              <form onSubmit={handleApplyCoupon} className="coupon-form">
                <div className="coupon-input-wrap">
                  <Tag size={16} className="coupon-icon" />
                  <input 
                    type="text" 
                    placeholder="Promo code (Try OLIVE10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn-apply-coupon">
                  Apply
                </button>
              </form>
            ) : (
              <div className="coupon-applied-box">
                <div className="applied-info">
                  <Tag size={16} className="tag-green" />
                  <span>Coupon <strong>{appliedCoupon.code}</strong> ({appliedCoupon.discountPercent}% OFF)</span>
                </div>
                <button onClick={removeCoupon} className="remove-coupon-btn">
                  Remove
                </button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="cart-summary-breakdown">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>

              {appliedCoupon && (
                <div className="summary-row discount-row">
                  <span>Discount ({appliedCoupon.discountPercent}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Estimated Shipping</span>
                <span>
                  {standardShippingCost === 0 ? (
                    <span className="free-shipping-tag">FREE</span>
                  ) : (
                    formatPrice(standardShippingCost)
                  )}
                </span>
              </div>

              <div className="summary-row total-row">
                <span>Estimated Total</span>
                <span className="grand-total">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button 
              className="btn btn-primary btn-lg checkout-btn"
              onClick={handleProceedToCheckout}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div className="drawer-security-note">
              <ShieldCheck size={14} />
              <span>Safe & Encrypted 256-Bit Checkout &bull; Cash on Delivery Available</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
