import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Search, 
  Truck, 
  Package, 
  CheckCircle2, 
  MapPin, 
  PhoneCall, 
  Copy, 
  ArrowRight
} from 'lucide-react';
import './OrderTrackingModal.css';

const OrderTrackingModal = () => {
  const { 
    isOrderTrackingOpen, 
    setIsOrderTrackingOpen, 
    activeTrackingOrder, 
    trackOrderById, 
    formatPrice, 
    showToast 
  } = useShop();

  const [inputOrderId, setInputOrderId] = useState('');

  if (!isOrderTrackingOpen) return null;

  const currentOrder = activeTrackingOrder;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!inputOrderId) return;
    trackOrderById(inputOrderId);
  };

  const copyTrackingNumber = () => {
    if (currentOrder && currentOrder.courierTrackingNumber) {
      navigator.clipboard.writeText(currentOrder.courierTrackingNumber);
      showToast('Courier Tracking Number copied to clipboard!', 'success');
    }
  };

  const modalNode = (
    <div className="tracking-overlay" onClick={() => setIsOrderTrackingOpen(false)}>
      <div className="tracking-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="tracking-header">
          <div className="tracking-header-left">
            <span className="tracking-eyebrow">
              <Truck size={14} />
              <span>LIVE ATELIER LOGISTICS</span>
            </span>
            <h3 className="tracking-title">Consignment Status & Tracking</h3>
          </div>

          <button 
            className="modal-close-btn"
            onClick={() => setIsOrderTrackingOpen(false)}
            aria-label="Close Tracking"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar to track another order */}
        <div className="tracking-search-bar-wrap">
          <form onSubmit={handleSearchSubmit} className="tracking-search-form">
            <Search size={18} className="tracking-search-icon" />
            <input 
              type="text" 
              placeholder="Enter your Order Reference (e.g. OLV-849201)..." 
              value={inputOrderId}
              onChange={(e) => setInputOrderId(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm">
              <span>Track</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>

        {/* Modal Body */}
        <div className="tracking-modal-body">
          {currentOrder ? (
            <div className="tracking-content-wrapper animate-fade">
              {/* Order Status Banner */}
              <div className="tracking-status-banner">
                <div className="status-banner-left">
                  <span className="order-id-tag">Order {currentOrder.id}</span>
                  <h4 className="status-headline">
                    {currentOrder.status === 'Delivered' 
                      ? 'Package Successfully Delivered' 
                      : currentOrder.status === 'In Transit' 
                      ? 'Out for Courier Delivery' 
                      : 'Being Prepared in Atelier'}
                  </h4>
                  <p className="eta-text">
                    Estimated Delivery: <strong>{currentOrder.deliveryEta}</strong>
                  </p>
                </div>

                <div className="status-live-pulse">
                  <span className="pulse-dot"></span>
                  <span className="pulse-text">Live Courier Dispatch</span>
                </div>
              </div>

              {/* Interactive Timeline Stepper */}
              <div className="tracking-stepper-box">
                <h5 className="timeline-title">Consignment Journey</h5>

                <div className="vertical-timeline">
                  {currentOrder.timeline && currentOrder.timeline.map((step, idx) => {
                    const isLast = idx === currentOrder.timeline.length - 1;
                    return (
                      <div 
                        key={idx} 
                        className={`timeline-step-row ${step.completed ? 'completed' : ''} ${step.current ? 'current-step' : ''}`}
                      >
                        <div className="step-marker-column">
                          <div className="marker-circle">
                            {step.completed ? (
                              <CheckCircle2 size={16} />
                            ) : (
                              <div className="pending-dot"></div>
                            )}
                          </div>
                          {!isLast && <div className="step-trail-line"></div>}
                        </div>

                        <div className="step-info-column">
                          <div className="step-title-row">
                            <span className="step-title-text">{step.title}</span>
                            <span className="step-time-text">{step.time}</span>
                          </div>
                          {step.current && (
                            <span className="current-pulse-badge">In Progress</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Courier & Logistics Details Grid */}
              <div className="tracking-details-grid">
                {/* Courier Partner */}
                <div className="tracking-detail-card">
                  <div className="card-heading-row">
                    <Truck size={17} className="card-icon" />
                    <h6>Courier Partner</h6>
                  </div>
                  <p className="courier-partner-name">{currentOrder.courier}</p>
                  
                  {currentOrder.courierTrackingNumber && (
                    <div className="tracking-num-row">
                      <span className="trk-lbl">Tracking No:</span>
                      <strong className="trk-code">{currentOrder.courierTrackingNumber}</strong>
                      <button 
                        type="button" 
                        onClick={copyTrackingNumber}
                        className="copy-trk-btn" 
                        title="Copy tracking number"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  )}

                  {currentOrder.courierRider && (
                    <p className="rider-contact-info">
                      <PhoneCall size={13} />
                      <span>Rider: <strong>{currentOrder.courierRider}</strong></span>
                    </p>
                  )}
                </div>

                {/* Delivery Address */}
                <div className="tracking-detail-card">
                  <div className="card-heading-row">
                    <MapPin size={17} className="card-icon" />
                    <h6>Delivery Destination</h6>
                  </div>
                  <p className="recipient-name">{currentOrder.recipient?.fullName || 'Client'}</p>
                  <p className="recipient-address">{currentOrder.recipient?.address}</p>
                  <p className="recipient-city">{currentOrder.recipient?.city}, Pakistan</p>
                  <p className="recipient-phone">Contact: {currentOrder.recipient?.phone}</p>
                </div>
              </div>

              {/* Parcels Content Preview */}
              <div className="parcel-contents-card">
                <h6>Garments in this Consignment ({currentOrder.items ? currentOrder.items.length : 1} Item)</h6>
                <div className="parcel-items-list">
                  {currentOrder.items && currentOrder.items.map((item, idx) => (
                    <div key={idx} className="parcel-item-row">
                      <img src={item.image} alt={item.name} />
                      <div className="parcel-item-info">
                        <span className="parcel-item-name">{item.name}</span>
                        <span className="parcel-item-spec">Size: {item.size} &bull; Color: {item.color} &bull; Qty: {item.quantity}</span>
                      </div>
                      <span className="parcel-item-price">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-tracking-state">
              <Package size={44} className="empty-icon" />
              <h4>Enter An Order Number</h4>
              <p>Please enter your 8-digit atelier order reference above to view real-time delivery status.</p>
            </div>
          )}
        </div>

        {/* Footer Support Notice */}
        <div className="tracking-modal-footer">
          <div className="footer-concierge-call">
            <PhoneCall size={15} />
            <span>Need immediate courier assistance? Concierge Hotline: <strong>+92 321 OLIVÉRA</strong></span>
          </div>

          <button className="btn btn-outline-olive btn-sm" onClick={() => setIsOrderTrackingOpen(false)}>
            Close Tracking
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalNode, document.body)
    : modalNode;
};

export default OrderTrackingModal;
