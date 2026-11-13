import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Package, 
  MapPin, 
  CreditCard, 
  Award, 
  LogOut, 
  ChevronRight, 
  ExternalLink, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Sparkles,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import './AccountModal.css';

const AccountModal = () => {
  const { 
    isAccountOpen, 
    setIsAccountOpen, 
    activeAccountTab, 
    setActiveAccountTab, 
    user, 
    logout, 
    orders, 
    formatPrice, 
    trackOrderById,
    addSavedAddress,
    addSavedCard
  } = useShop();

  // State for Add Address Form
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: 'Work / Studio',
    fullName: user ? user.name : '',
    address: '',
    city: 'Lahore',
    postalCode: '',
    phone: user ? user.phone : ''
  });

  // State for Add Card Form
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    brand: 'Visa',
    cardNumber: '',
    expiry: '',
    holder: user ? user.name.toUpperCase() : ''
  });

  if (!isAccountOpen || !user) return null;

  const handleTrackClick = (orderId) => {
    setIsAccountOpen(false);
    trackOrderById(orderId);
  };

  const handleSaveAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddress.address) return;
    addSavedAddress(newAddress);
    setShowAddAddress(false);
    setNewAddress({
      title: 'Work / Studio',
      fullName: user.name,
      address: '',
      city: 'Lahore',
      postalCode: '',
      phone: user.phone
    });
  };

  const handleSaveCardSubmit = (e) => {
    e.preventDefault();
    if (!newCard.cardNumber || newCard.cardNumber.length < 15) return;
    addSavedCard({
      brand: newCard.brand,
      last4: newCard.cardNumber.slice(-4),
      expiry: newCard.expiry || '12/28',
      holder: newCard.holder
    });
    setShowAddCard(false);
    setNewCard({
      brand: 'Visa',
      cardNumber: '',
      expiry: '',
      holder: user.name.toUpperCase()
    });
  };

  const userInitials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="account-overlay overlay-backdrop" onClick={() => setIsAccountOpen(false)}>
      <div className="account-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header Profile Summary */}
        <div className="account-header">
          <div className="account-profile-main">
            <div className="account-avatar">
              <span>{userInitials}</span>
              <span className="avatar-badge-vip">★</span>
            </div>

            <div className="account-details">
              <div className="account-name-row">
                <h3 className="account-name">{user.name}</h3>
                <span className="vip-tier-badge">
                  <Sparkles size={12} />
                  <span>{user.tier}</span>
                </span>
              </div>
              <p className="account-meta">{user.email} &bull; {user.phone}</p>
              <div className="points-pill">
                <span>Atelier Balance: <strong>{user.loyaltyPoints} Points</strong> (Rs. {user.loyaltyPoints * 2} Credit)</span>
              </div>
            </div>
          </div>

          <button 
            className="modal-close-btn"
            onClick={() => setIsAccountOpen(false)}
            aria-label="Close Account"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="account-nav-bar">
          <button 
            className={`account-nav-tab ${activeAccountTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveAccountTab('orders')}
          >
            <Package size={17} />
            <span>My Orders ({orders.length})</span>
          </button>

          <button 
            className={`account-nav-tab ${activeAccountTab === 'addresses' ? 'active' : ''}`}
            onClick={() => setActiveAccountTab('addresses')}
          >
            <MapPin size={17} />
            <span>Addresses ({user.addresses ? user.addresses.length : 0})</span>
          </button>

          <button 
            className={`account-nav-tab ${activeAccountTab === 'savedCards' ? 'active' : ''}`}
            onClick={() => setActiveAccountTab('savedCards')}
          >
            <CreditCard size={17} />
            <span>Payment Methods</span>
          </button>

          <button 
            className={`account-nav-tab ${activeAccountTab === 'perks' ? 'active' : ''}`}
            onClick={() => setActiveAccountTab('perks')}
          >
            <Award size={17} />
            <span>Privé Perks</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="account-body-content">
          {/* TAB 1: ORDERS */}
          {activeAccountTab === 'orders' && (
            <div className="orders-tab-view animate-fade">
              {orders.length === 0 ? (
                <div className="empty-orders-view">
                  <Package size={48} className="empty-icon" />
                  <h4>No Orders Found</h4>
                  <p>You haven't placed an order yet. Explore our curated collection to start shopping.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((ord) => {
                    const statusClass = 
                      ord.status === 'Delivered' 
                        ? 'status-delivered' 
                        : ord.status === 'In Transit' 
                        ? 'status-transit' 
                        : 'status-processing';

                    return (
                      <div key={ord.id} className="order-item-card">
                        <div className="order-item-top">
                          <div>
                            <span className="order-reference-label">Order Ref:</span>
                            <span className="order-reference-number">{ord.id}</span>
                            <span className="order-date">&bull; {ord.date}</span>
                          </div>

                          <div className={`order-status-badge ${statusClass}`}>
                            {ord.status === 'Delivered' ? (
                              <CheckCircle2 size={13} />
                            ) : ord.status === 'In Transit' ? (
                              <Truck size={13} />
                            ) : (
                              <Clock size={13} />
                            )}
                            <span>{ord.status}</span>
                          </div>
                        </div>

                        {/* Items Thumbnail Row */}
                        <div className="order-items-preview-strip">
                          {ord.items && ord.items.map((item, idx) => (
                            <div key={idx} className="preview-thumb-block">
                              <img src={item.image} alt={item.name} />
                              <div className="thumb-info">
                                <span className="item-thumb-name">{item.name}</span>
                                <span className="item-thumb-meta">Qty: {item.quantity} &bull; Size: {item.size}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer & Actions */}
                        <div className="order-item-bottom">
                          <div className="order-financial-info">
                            <span className="order-total-label">Total Amount</span>
                            <span className="order-total-value">{formatPrice(ord.total)}</span>
                            <span className="order-pay-method">{ord.paymentMethod}</span>
                          </div>

                          <div className="order-actions-group">
                            <button 
                              className="btn btn-outline-olive btn-sm track-order-btn"
                              onClick={() => handleTrackClick(ord.id)}
                            >
                              <Truck size={14} />
                              <span>Live Courier Tracking</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ADDRESSES */}
          {activeAccountTab === 'addresses' && (
            <div className="addresses-tab-view animate-fade">
              <div className="tab-section-header">
                <div>
                  <h4 className="tab-section-title">Saved Shipping Addresses</h4>
                  <p className="tab-section-desc">Manage delivery addresses for expedited checkout.</p>
                </div>
                <button 
                  className="btn btn-outline-olive btn-sm"
                  onClick={() => setShowAddAddress(!showAddAddress)}
                >
                  <Plus size={15} />
                  <span>{showAddAddress ? 'Cancel' : 'Add New Address'}</span>
                </button>
              </div>

              {showAddAddress && (
                <form onSubmit={handleSaveAddressSubmit} className="add-address-form animate-fade">
                  <div className="form-row two-cols">
                    <div className="form-group">
                      <label>Address Label (e.g. Home, Office)</label>
                      <input 
                        type="text" 
                        value={newAddress.title}
                        onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Recipient Name</label>
                      <input 
                        type="text" 
                        value={newAddress.fullName}
                        onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Street Address / Apartment / Area</label>
                    <input 
                      type="text" 
                      value={newAddress.address}
                      onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                      placeholder="e.g. House 14, Street 2, Sector F-7/2"
                      required
                    />
                  </div>

                  <div className="form-row two-cols">
                    <div className="form-group">
                      <label>City</label>
                      <select 
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      >
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Contact Phone</label>
                      <input 
                        type="tel" 
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-sm">
                    Save Address
                  </button>
                </form>
              )}

              <div className="addresses-grid">
                {user.addresses && user.addresses.map((addr) => (
                  <div key={addr.id} className="address-card">
                    <div className="address-card-top">
                      <span className="address-title">{addr.title}</span>
                      {addr.isDefault && <span className="default-pill">Default</span>}
                    </div>
                    <p className="address-recipient">{addr.fullName}</p>
                    <p className="address-street">{addr.address}</p>
                    <p className="address-city">{addr.city}, Pakistan ({addr.postalCode || '54000'})</p>
                    <p className="address-phone">Phone: {addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENT METHODS */}
          {activeAccountTab === 'savedCards' && (
            <div className="cards-tab-view animate-fade">
              <div className="tab-section-header">
                <div>
                  <h4 className="tab-section-title">Saved Payment Methods</h4>
                  <p className="tab-section-desc">Encrypted with PCI-DSS 256-bit atelier security.</p>
                </div>
                <button 
                  className="btn btn-outline-olive btn-sm"
                  onClick={() => setShowAddCard(!showAddCard)}
                >
                  <Plus size={15} />
                  <span>{showAddCard ? 'Cancel' : 'Add New Card'}</span>
                </button>
              </div>

              {showAddCard && (
                <form onSubmit={handleSaveCardSubmit} className="add-card-form animate-fade">
                  <div className="form-row two-cols">
                    <div className="form-group">
                      <label>Cardholder Name</label>
                      <input 
                        type="text" 
                        value={newCard.holder}
                        onChange={(e) => setNewCard({ ...newCard, holder: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Card Type</label>
                      <select 
                        value={newCard.brand}
                        onChange={(e) => setNewCard({ ...newCard, brand: e.target.value })}
                      >
                        <option value="Visa">Visa Card</option>
                        <option value="Mastercard">MasterCard</option>
                        <option value="Amex">American Express</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row two-cols">
                    <div className="form-group">
                      <label>Card Number</label>
                      <input 
                        type="text" 
                        maxLength="19"
                        placeholder="•••• •••• •••• ••••"
                        value={newCard.cardNumber}
                        onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Expiry (MM/YY)</label>
                      <input 
                        type="text" 
                        maxLength="5"
                        placeholder="MM/YY"
                        value={newCard.expiry}
                        onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-sm">
                    Save Encrypted Card
                  </button>
                </form>
              )}

              <div className="saved-cards-grid">
                {user.savedCards && user.savedCards.map((c) => (
                  <div key={c.id} className="luxury-credit-card-preview">
                    <div className="card-top-row">
                      <span className="card-brand">{c.brand}</span>
                      <ShieldCheck size={18} />
                    </div>
                    <div className="card-chip"></div>
                    <div className="card-number-display">
                      •••• &nbsp; •••• &nbsp; •••• &nbsp; {c.last4}
                    </div>
                    <div className="card-bottom-row">
                      <div>
                        <span className="card-lbl">CARDHOLDER</span>
                        <span className="card-val">{c.holder}</span>
                      </div>
                      <div>
                        <span className="card-lbl">EXPIRES</span>
                        <span className="card-val">{c.expiry}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PERKS */}
          {activeAccountTab === 'perks' && (
            <div className="perks-tab-view animate-fade">
              <div className="perks-banner">
                <Sparkles size={28} className="gold-sparkle" />
                <div>
                  <h4 className="perks-heading">You are a Valued VIP Gold Patron</h4>
                  <p>Enjoy bespoke privileges reserved exclusively for our private membership circle.</p>
                </div>
              </div>

              <div className="perks-grid">
                <div className="perk-card">
                  <div className="perk-icon-wrap">
                    <Truck size={22} />
                  </div>
                  <h5>Complimentary Express Shipping</h5>
                  <p>Zero delivery charges on all orders throughout Pakistan, dispatched via priority air courier.</p>
                </div>

                <div className="perk-card">
                  <div className="perk-icon-wrap">
                    <Sparkles size={22} />
                  </div>
                  <h5>Early Capsule Access</h5>
                  <p>48-hour private window to view and acquire limited seasonal drops before public release.</p>
                </div>

                <div className="perk-card">
                  <div className="perk-icon-wrap">
                    <Smartphone size={22} />
                  </div>
                  <h5>Private WhatsApp Concierge</h5>
                  <p>Direct line to our head stylist for custom fittings, size advice, and personal wardrobe curation.</p>
                </div>

                <div className="perk-card">
                  <div className="perk-icon-wrap">
                    <Award size={22} />
                  </div>
                  <h5>Double Atelier Points</h5>
                  <p>Earn 2 loyalty points for every Rs. 100 spent, redeemable instantly on all future purchases.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="account-modal-footer">
          <button className="btn btn-outline-danger btn-sm" onClick={logout}>
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>

          <button className="btn btn-primary btn-sm" onClick={() => setIsAccountOpen(false)}>
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
