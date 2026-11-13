import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle, ShoppingBag, Heart, AlertCircle, Info, X } from 'lucide-react';
import './ToastNotification.css';

const ToastNotification = () => {
  const { toast, setToast, setIsCartOpen } = useShop();

  if (!toast) return null;

  const renderIcon = () => {
    switch (toast.type) {
      case 'cart':
        return <ShoppingBag size={18} className="toast-icon icon-cart" />;
      case 'heart':
        return <Heart size={18} fill="#3A4D39" className="toast-icon icon-heart" />;
      case 'error':
        return <AlertCircle size={18} className="toast-icon icon-error" />;
      case 'info':
        return <Info size={18} className="toast-icon icon-info" />;
      default:
        return <CheckCircle size={18} className="toast-icon icon-success" />;
    }
  };

  return (
    <div className="toast-container animate-fade">
      <div className="toast-card glass-panel">
        <div className="toast-icon-frame">
          {renderIcon()}
        </div>

        <div className="toast-text-area">
          <p className="toast-msg">{toast.message}</p>
          {toast.type === 'cart' && (
            <button 
              className="toast-view-cart-link"
              onClick={() => {
                setToast(null);
                setIsCartOpen(true);
              }}
            >
              View Bag &rarr;
            </button>
          )}
        </div>

        <button 
          className="toast-dismiss-btn"
          onClick={() => setToast(null)}
          aria-label="Dismiss notification"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;
