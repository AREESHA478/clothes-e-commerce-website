import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Package, 
  MapPin, 
  CreditCard, 
  LogOut, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ShieldCheck,
  User,
  Save,
  ArrowRight
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
    updateUserProfile,
    addSavedAddress,
    addSavedCard
  } = useShop();

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    phone: user ? user.phone : '',
    stylePreference: user ? (user.stylePreference || 'Relaxed Tailoring & Normandy Flax') : 'Relaxed Tailoring & Normandy Flax',
    standardSize: 'M'
  });

  // State for Add Address Form
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: 'Home (DHA)',
    fullName: user ? user.name : '',
    address: '',
    city: 'Lahore',
    postalCode: '54000',
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

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!profileForm.name.trim()) return;
    updateUserProfile({
      name: profileForm.name.trim(),
      email: profileForm.email.trim(),
      phone: profileForm.phone.trim(),
      stylePreference: profileForm.stylePreference
    });
  };

  const handleSaveAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddress.address.trim()) return;
    addSavedAddress(newAddress);
    setShowAddAddress(false);
    setNewAddress({
      title: 'Studio / Office',
      fullName: user.name,
      address: '',
      city: 'Lahore',
      postalCode: '54000',
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

  const modalNode = (
    <div className="account-overlay" onClick={() => setIsAccountOpen(false)}>
      <div 
        className="account-modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header Section */}
        <div className="account-header">
          <div className="account-profile-summary">
            <div className="account-avatar-circle">
              <span>{userInitials}</span>
            </div>

            <div className="account-client-meta">
              <div className="account-client-name-row">
                <h3 className="account-client-name">{user.name}</h3>
                <span className="client-status-badge">Atelier Client</span>
              </div>
              <p className="account-client-contact">
                {user.email} &bull; {user.phone} &bull; Member since {user.memberSince || '2024'}
              </p>
            </div>
          </div>

          <div className="account-header-actions">
            <button 
              type="button" 
              className="btn-header-signout"
              onClick={logout}
              title="Sign Out"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>

            <button 
              className="account-close-btn"
              onClick={() => setIsAccountOpen(false)}
              aria-label="Close Account"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="account-tabs-bar">
          <button 
            type="button"
            className={`account-tab-btn ${activeAccountTab === 'orders' ? 'is-active' : ''}`}
            onClick={() => setActiveAccountTab('orders')}
          >
            <Package size={16} />
            <span>Orders &amp; Tracking</span>
            <span className="tab-badge">{orders.length}</span>
          </button>

          <button 
            type="button"
            className={`account-tab-btn ${activeAccountTab === 'profile' ? 'is-active' : ''}`}
            onClick={() => setActiveAccountTab('profile')}
          >
            <User size={16} />
            <span>Profile &amp; Tailoring</span>
          </button>

          <button 
            type="button"
            className={`account-tab-btn ${activeAccountTab === 'addresses' ? 'is-active' : ''}`}
            onClick={() => setActiveAccountTab('addresses')}
          >
            <MapPin size={16} />
            <span>Delivery Addresses</span>
            <span className="tab-badge">{user.addresses ? user.addresses.length : 0}</span>
          </button>

          <button 
            type="button"
            className={`account-tab-btn ${activeAccountTab === 'savedCards' ? 'is-active' : ''}`}
            onClick={() => setActiveAccountTab('savedCards')}
          >
            <CreditCard size={16} />
            <span>Payment Methods</span>
            <span className="tab-badge">{user.savedCards ? user.savedCards.length : 0}</span>
          </button>
        </div>

        {/* Body Content Area */}
        <div className="account-modal-body">
          {/* ================= TAB 1: ORDERS & TRACKING ================= */}
          {activeAccountTab === 'orders' && (
            <div className="orders-tab-view animate-fade">
              <div className="dashboard-section-header">
                <div>
                  <h4 className="dashboard-section-title">Order History &amp; Dispatch Tracking</h4>
                  <p className="dashboard-section-subtitle">
                    Track live parcels, view archival receipts, and inspect order progress.
                  </p>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="empty-orders-card">
                  <Package size={40} color="#737A73" />
                  <h4>No Orders Found</h4>
                  <p>You haven't placed an order with the atelier yet. Explore our handcrafted collection.</p>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    <span>Browse Collection</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <div className="orders-flow-list">
                  {orders.map((ord) => {
                    const isDelivered = ord.status === 'Delivered';
                    const isInTransit = ord.status === 'In Transit';
                    const statusClass = isDelivered ? 'delivered' : isInTransit ? 'transit' : 'processing';

                    return (
                      <div key={ord.id} className="dashboard-order-card">
                        <div className="order-card-header">
                          <div className="order-ref-group">
                            <span>Ref:</span>
                            <span className="order-ref-bold">{ord.id}</span>
                            <span className="order-date-text">&bull; {ord.date}</span>
                          </div>

                          <div className={`order-status-pill ${statusClass}`}>
                            {isDelivered ? <CheckCircle2 size={13} /> : isInTransit ? <Truck size={13} /> : <Clock size={13} />}
                            <span>{ord.status}</span>
                          </div>
                        </div>

                        {/* Items preview */}
                        <div className="order-items-scroll-row">
                          {ord.items && ord.items.map((item, idx) => (
                            <div key={idx} className="order-item-line">
                              <img src={item.image} alt={item.name} className="order-item-img" />
                              <div className="order-item-info">
                                <span className="order-item-title">{item.name}</span>
                                <span className="order-item-specs">
                                  Size: {item.size} &bull; Qty: {item.quantity} &bull; {item.color || 'Standard'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Card bottom */}
                        <div className="order-card-footer">
                          <div className="order-price-group">
                            <span className="order-price-label">Order Total:</span>
                            <span className="order-price-amount">{formatPrice(ord.total)}</span>
                            <span className="order-payment-tag">&bull; {ord.paymentMethod}</span>
                          </div>

                          <button 
                            type="button" 
                            className="btn-track-order"
                            onClick={() => handleTrackClick(ord.id)}
                          >
                            <Truck size={14} />
                            <span>Live Courier Tracking</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 2: PROFILE & PREFERENCES ================= */}
          {activeAccountTab === 'profile' && (
            <div className="profile-tab-view animate-fade">
              <div className="dashboard-section-header">
                <div>
                  <h4 className="dashboard-section-title">Personal Details &amp; Tailoring Profile</h4>
                  <p className="dashboard-section-subtitle">
                    Configure your primary contact information and preferred sartorial silhouette.
                  </p>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit} className="profile-form-grid">
                <div className="profile-fields-two-cols">
                  <div className="profile-field-block">
                    <label>Full Legal Name</label>
                    <input 
                      type="text" 
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="profile-field-block">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="profile-fields-two-cols">
                  <div className="profile-field-block">
                    <label>Contact Phone / WhatsApp</label>
                    <input 
                      type="tel" 
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="profile-field-block">
                    <label>Preferred Sizing</label>
                    <select 
                      value={profileForm.standardSize}
                      onChange={(e) => setProfileForm({ ...profileForm, standardSize: e.target.value })}
                    >
                      <option value="XS">Extra Small (XS)</option>
                      <option value="S">Small (S)</option>
                      <option value="M">Medium (M) - Atelier Standard</option>
                      <option value="L">Large (L)</option>
                      <option value="XL">Extra Large (XL)</option>
                    </select>
                  </div>
                </div>

                <div className="profile-field-block">
                  <label>Sartorial Silhouette Preference</label>
                  <select 
                    value={profileForm.stylePreference}
                    onChange={(e) => setProfileForm({ ...profileForm, stylePreference: e.target.value })}
                  >
                    <option value="Relaxed Tailoring & Normandy Flax">Relaxed Tailoring &amp; Pure Normandy Flax</option>
                    <option value="Raw Silk & Structured Heritage Weaves">Raw Silk &amp; Structured Heritage Weaves</option>
                    <option value="Minimalist Monochrome & Clean Linens">Minimalist Monochrome &amp; Clean Linens</option>
                    <option value="Warm Earth Neutrals & Layered Knits">Warm Earth Neutrals &amp; Layered Knits</option>
                  </select>
                </div>

                <button type="submit" className="btn-save-profile">
                  <Save size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  <span>Save Profile Changes</span>
                </button>
              </form>
            </div>
          )}

          {/* ================= TAB 3: ADDRESSES ================= */}
          {activeAccountTab === 'addresses' && (
            <div className="addresses-tab-view animate-fade">
              <div className="dashboard-section-header">
                <div>
                  <h4 className="dashboard-section-title">Saved Shipping Addresses</h4>
                  <p className="dashboard-section-subtitle">
                    Addresses saved for complimentary express courier dispatch.
                  </p>
                </div>

                <button 
                  type="button" 
                  className="btn btn-outline-olive btn-sm"
                  onClick={() => setShowAddAddress(!showAddAddress)}
                >
                  <Plus size={14} />
                  <span>{showAddAddress ? 'Cancel' : 'Add Address'}</span>
                </button>
              </div>

              {showAddAddress && (
                <form onSubmit={handleSaveAddressSubmit} className="add-address-panel animate-fade">
                  <div className="add-address-two-cols">
                    <div className="profile-field-block">
                      <label>Address Label (e.g. Home, Studio, Office)</label>
                      <input 
                        type="text" 
                        value={newAddress.title}
                        onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="profile-field-block">
                      <label>Recipient Name</label>
                      <input 
                        type="text" 
                        value={newAddress.fullName}
                        onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="profile-field-block">
                    <label>Street Address / Apartment / Sector</label>
                    <input 
                      type="text" 
                      value={newAddress.address}
                      onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                      placeholder="e.g. House 42, Street 7, Phase 5, DHA"
                      required
                    />
                  </div>

                  <div className="add-address-two-cols">
                    <div className="profile-field-block">
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
                        <option value="Peshawar">Peshawar</option>
                        <option value="Multan">Multan</option>
                        <option value="Quetta">Quetta</option>
                      </select>
                    </div>

                    <div className="profile-field-block">
                      <label>Contact Phone</label>
                      <input 
                        type="tel" 
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start' }}>
                    Save Address
                  </button>
                </form>
              )}

              <div className="addresses-cards-grid">
                {user.addresses && user.addresses.map((addr) => (
                  <div key={addr.id} className="address-item-card">
                    <div className="address-card-header">
                      <span className="address-title-tag">{addr.title}</span>
                      {addr.isDefault && <span className="address-default-badge">Default</span>}
                    </div>
                    <p className="address-recipient-name">{addr.fullName}</p>
                    <p className="address-line-text">{addr.address}</p>
                    <p className="address-line-text">{addr.city}, Pakistan ({addr.postalCode || '54000'})</p>
                    <p className="address-phone-text">Phone: {addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: PAYMENT METHODS ================= */}
          {activeAccountTab === 'savedCards' && (
            <div className="cards-tab-view animate-fade">
              <div className="dashboard-section-header">
                <div>
                  <h4 className="dashboard-section-title">Encrypted Payment Cards</h4>
                  <p className="dashboard-section-subtitle">
                    Protected with 256-Bit SSL Atelier Encryption &amp; PCI-DSS standards.
                  </p>
                </div>

                <button 
                  type="button" 
                  className="btn btn-outline-olive btn-sm"
                  onClick={() => setShowAddCard(!showAddCard)}
                >
                  <Plus size={14} />
                  <span>{showAddCard ? 'Cancel' : 'Add Card'}</span>
                </button>
              </div>

              {showAddCard && (
                <form onSubmit={handleSaveCardSubmit} className="add-address-panel animate-fade">
                  <div className="add-address-two-cols">
                    <div className="profile-field-block">
                      <label>Cardholder Name</label>
                      <input 
                        type="text" 
                        value={newCard.holder}
                        onChange={(e) => setNewCard({ ...newCard, holder: e.target.value })}
                        required
                      />
                    </div>
                    <div className="profile-field-block">
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

                  <div className="add-address-two-cols">
                    <div className="profile-field-block">
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
                    <div className="profile-field-block">
                      <label>Expiry Date (MM/YY)</label>
                      <input 
                        type="text" 
                        maxLength="5"
                        placeholder="12/28"
                        value={newCard.expiry}
                        onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start' }}>
                    Save Encrypted Card
                  </button>
                </form>
              )}

              <div className="cards-cards-grid">
                {user.savedCards && user.savedCards.map((c) => (
                  <div key={c.id} className="luxury-card-display">
                    <div className="card-top-line">
                      <span className="card-brand-name">{c.brand}</span>
                      <ShieldCheck size={18} color="#D4AF37" />
                    </div>
                    <div className="card-chip-symbol"></div>
                    <div className="card-masked-digits">
                      •••• &nbsp; •••• &nbsp; •••• &nbsp; {c.last4}
                    </div>
                    <div className="card-details-row">
                      <div className="card-holder-col">
                        <span className="card-small-label">CARDHOLDER</span>
                        <span className="card-actual-val">{c.holder}</span>
                      </div>
                      <div className="card-expiry-col">
                        <span className="card-small-label">EXPIRES</span>
                        <span className="card-actual-val">{c.expiry}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="account-modal-footer">
          <button 
            type="button" 
            className="btn-secondary-link"
            onClick={logout}
          >
            <LogOut size={14} />
            <span>Sign Out of Atelier</span>
          </button>

          <button 
            type="button" 
            className="btn btn-primary btn-sm"
            onClick={() => setIsAccountOpen(false)}
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalNode, document.body)
    : modalNode;
};

export default AccountModal;
