import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  CheckCircle, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Banknote, 
  Smartphone, 
  Building2,
  ArrowRight, 
  Printer, 
  ShoppingBag,
  Lock,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import './CheckoutModal.css';

const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    discountAmount, 
    standardShippingCost, 
    appliedCoupon, 
    formatPrice, 
    clearCart,
    addOrder,
    trackOrderById,
    setIsAccountOpen,
    setActiveAccountTab,
    showToast,
    user
  } = useShop();

  const [step, setStep] = useState(1); // 1: Shipping Info, 2: Payment, 3: Confirmation
  
  // Delivery Form Data
  const [formData, setFormData] = useState({
    fullName: user ? user.name : 'Fatima Zahra',
    email: user ? user.email : 'fatima.zahra@example.com',
    phone: user ? user.phone : '0321-9876543',
    address: user?.addresses?.[0]?.address || 'House 42, Street 7, Phase 5, DHA',
    city: user?.addresses?.[0]?.city || 'Lahore',
    postalCode: user?.addresses?.[0]?.postalCode || '54000',
    deliveryNotes: 'Please ring the doorbell upon arrival.'
  });

  const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard', 'priority'
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'cod', 'easypaisa', 'bank'

  // Card Payment Details State
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4242 8821 9931 4242',
    cardHolder: user ? user.name.toUpperCase() : 'FATIMA ZAHRA',
    expiry: '09/28',
    cvv: '842',
    saveCard: true
  });

  // Mobile Wallet State
  const [walletType, setWalletType] = useState('easypaisa'); // 'easypaisa', 'jazzcash'
  const [walletPhone, setWalletPhone] = useState(user ? user.phone : '0321-9876543');

  // Bank Transfer Reference State
  const [bankRef, setBankRef] = useState('');
  const [copiedIban, setCopiedIban] = useState(false);

  // Completed Order State
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  const shippingCostFinal = shippingMethod === 'priority' ? standardShippingCost + 300 : standardShippingCost;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingCostFinal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Card Number Auto-formatting (adds spaces every 4 digits)
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    let formatted = val.replace(/(.{4})/g, '$1 ').trim();
    setCardDetails((prev) => ({ ...prev, cardNumber: formatted }));
  };

  // Expiry Date Auto-formatting (adds slash MM/YY)
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 2) {
      val = val.slice(0, 2) + '/' + val.slice(2);
    }
    setCardDetails((prev) => ({ ...prev, expiry: val }));
  };

  const copyIban = () => {
    navigator.clipboard.writeText('PK36MEZN0001020304050607');
    setCopiedIban(true);
    showToast('IBAN copied to clipboard!', 'success');
    setTimeout(() => setCopiedIban(false), 2500);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
        showToast('Please fill in all essential delivery details.', 'error');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Validate payment specific details
      if (paymentMethod === 'card') {
        const rawDigits = cardDetails.cardNumber.replace(/\s+/g, '');
        if (rawDigits.length < 15) {
          showToast('Please enter a valid 16-digit card number.', 'error');
          return;
        }
      }

      // Complete order & save to state
      const randomId = 'OLV-' + Math.floor(100000 + Math.random() * 900000);
      setGeneratedOrderId(randomId);

      // Determine payment label
      const paymentLabel = 
        paymentMethod === 'cod' ? 'Cash on Delivery (COD)' :
        paymentMethod === 'card' ? `Credit Card (${cardDetails.cardNumber.slice(0, 4) === '4242' ? 'Visa' : 'Mastercard'} •••• ${cardDetails.cardNumber.replace(/\s+/g, '').slice(-4)})` :
        paymentMethod === 'easypaisa' ? `${walletType === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'} Mobile Wallet (${walletPhone})` :
        `Bank Transfer / Raast (Ref: ${bankRef || 'Verified'})`;

      const newOrderData = {
        id: randomId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        recipient: { ...formData },
        items: cart.map((item) => ({
          id: item.productId,
          name: item.product.name,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.images[0]
        })),
        subtotal: cartSubtotal,
        discountAmount,
        shippingCost: shippingCostFinal,
        total: grandTotal,
        paymentMethod: paymentLabel,
        paymentStatus: paymentMethod === 'cod' ? 'Payment on Delivery' : 'Paid & Authenticated'
      };

      addOrder(newOrderData);
      setOrderConfirmed(true);
      setStep(3);
      clearCart();

      // Confetti Celebration
      try {
        confetti({
          particleCount: 130,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#3A4D39', '#C5A059', '#ECE3CE', '#2D3C2C']
        });
      } catch (err) {
        // ignore
      }
    }
  };

  const handleTrackDirectly = () => {
    setIsCheckoutOpen(false);
    trackOrderById(generatedOrderId);
  };

  const handleViewOrders = () => {
    setIsCheckoutOpen(false);
    setActiveAccountTab('orders');
    setIsAccountOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isCheckoutOpen) return null;

  return (
    <div className="checkout-overlay overlay-backdrop" onClick={() => setIsCheckoutOpen(false)}>
      <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="checkout-header">
          <div className="checkout-logo-area">
            <span className="brand-name">OLIVÉRA</span>
            <span className="checkout-mode-badge">
              <ShieldCheck size={14} />
              <span>Safe Atelier Checkout</span>
            </span>
          </div>

          <button 
            className="modal-close-btn"
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Close checkout"
          >
            <X size={20} />
          </button>
        </div>

        {/* Stepper Progress Indicator */}
        {!orderConfirmed && (
          <div className="checkout-stepper">
            <div className={`step-node ${step >= 1 ? 'step-active' : ''}`}>
              <span className="step-num">1</span>
              <span className="step-text">Delivery Address</span>
            </div>
            <div className="step-connector"></div>
            <div className={`step-node ${step >= 2 ? 'step-active' : ''}`}>
              <span className="step-num">2</span>
              <span className="step-text">Payment & Shipping</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="checkout-body">
          {!orderConfirmed ? (
            <div className="checkout-grid">
              {/* Form Side */}
              <div className="checkout-form-side">
                {step === 1 && (
                  <form onSubmit={handleNextStep} className="shipping-form animate-fade">
                    <h3 className="form-subheading">Shipping Information</h3>

                    <div className="form-row">
                      <div className="form-field full-width">
                        <label>Recipient Full Name *</label>
                        <input 
                          type="text" 
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                    </div>

                    <div className="form-row two-cols">
                      <div className="form-field">
                        <label>Email Address (For Tracking & Invoice) *</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      <div className="form-field">
                        <label>Phone / WhatsApp (For Courier Rider) *</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field full-width">
                        <label>Street Address / Apartment / House *</label>
                        <input 
                          type="text" 
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                    </div>

                    <div className="form-row two-cols">
                      <div className="form-field">
                        <label>City *</label>
                        <select 
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                        >
                          <option value="Lahore">Lahore</option>
                          <option value="Karachi">Karachi</option>
                          <option value="Islamabad">Islamabad</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Multan">Multan</option>
                          <option value="Peshawar">Peshawar</option>
                          <option value="Sialkot">Sialkot</option>
                          <option value="Quetta">Quetta</option>
                          <option value="International">International Delivery</option>
                        </select>
                      </div>

                      <div className="form-field">
                        <label>Postal / Zip Code</label>
                        <input 
                          type="text" 
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field full-width">
                        <label>Delivery Instructions (Optional)</label>
                        <input 
                          type="text" 
                          name="deliveryNotes"
                          value={formData.deliveryNotes}
                          onChange={handleInputChange}
                          placeholder="e.g. Leave with reception or security concierge"
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg step-continue-btn">
                      <span>Continue to Payment & Shipping</span>
                      <ArrowRight size={18} />
                    </button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleNextStep} className="payment-form animate-fade">
                    {/* Shipping Speed Options */}
                    <h3 className="form-subheading">Shipping Method</h3>
                    <div className="method-options-group">
                      <label 
                        className={`method-option-card ${shippingMethod === 'standard' ? 'selected' : ''}`}
                        onClick={() => setShippingMethod('standard')}
                      >
                        <input 
                          type="radio" 
                          name="shippingMethod" 
                          checked={shippingMethod === 'standard'} 
                          onChange={() => setShippingMethod('standard')}
                        />
                        <div className="method-details">
                          <span className="method-name">Express Dispatch (2-3 Business Days)</span>
                          <span className="method-sub">Complimentary insurance & gold packaging</span>
                        </div>
                        <span className="method-cost">
                          {standardShippingCost === 0 ? 'FREE' : formatPrice(standardShippingCost)}
                        </span>
                      </label>

                      <label 
                        className={`method-option-card ${shippingMethod === 'priority' ? 'selected' : ''}`}
                        onClick={() => setShippingMethod('priority')}
                      >
                        <input 
                          type="radio" 
                          name="shippingMethod" 
                          checked={shippingMethod === 'priority'} 
                          onChange={() => setShippingMethod('priority')}
                        />
                        <div className="method-details">
                          <span className="method-name">VIP Next-Day Priority Courier</span>
                          <span className="method-sub">Same-day courier dispatch before 2 PM</span>
                        </div>
                        <span className="method-cost">+{formatPrice(300)}</span>
                      </label>
                    </div>

                    {/* Payment Gateways Selection */}
                    <h3 className="form-subheading" style={{ marginTop: '24px' }}>Select Payment Method</h3>
                    <div className="payment-tabs-grid">
                      <button
                        type="button"
                        className={`pay-tab-card ${paymentMethod === 'card' ? 'pay-tab-active' : ''}`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <CreditCard size={20} />
                        <span className="pay-tab-title">Credit / Debit Card</span>
                        <span className="pay-tab-sub">Visa & MasterCard</span>
                      </button>

                      <button
                        type="button"
                        className={`pay-tab-card ${paymentMethod === 'cod' ? 'pay-tab-active' : ''}`}
                        onClick={() => setPaymentMethod('cod')}
                      >
                        <Banknote size={20} />
                        <span className="pay-tab-title">Cash on Delivery</span>
                        <span className="pay-tab-sub">Pay courier upon arrival</span>
                      </button>

                      <button
                        type="button"
                        className={`pay-tab-card ${paymentMethod === 'easypaisa' ? 'pay-tab-active' : ''}`}
                        onClick={() => setPaymentMethod('easypaisa')}
                      >
                        <Smartphone size={20} />
                        <span className="pay-tab-title">Mobile Wallet</span>
                        <span className="pay-tab-sub">EasyPaisa & JazzCash</span>
                      </button>

                      <button
                        type="button"
                        className={`pay-tab-card ${paymentMethod === 'bank' ? 'pay-tab-active' : ''}`}
                        onClick={() => setPaymentMethod('bank')}
                      >
                        <Building2 size={20} />
                        <span className="pay-tab-title">Raast / Bank Wire</span>
                        <span className="pay-tab-sub">Direct instant transfer</span>
                      </button>
                    </div>

                    {/* PAYMENT METHOD 1: CARD FORM */}
                    {paymentMethod === 'card' && (
                      <div className="interactive-payment-panel animate-fade">
                        <div className="card-input-box">
                          <div className="form-row">
                            <div className="form-field full-width">
                              <label>Card Number (16 Digits)</label>
                              <div className="input-with-badge">
                                <input 
                                  type="text" 
                                  value={cardDetails.cardNumber}
                                  onChange={handleCardNumberChange}
                                  placeholder="4242 •••• •••• 4242"
                                  maxLength="19"
                                  required
                                />
                                <span className="card-network-badge">
                                  {cardDetails.cardNumber.startsWith('4') ? 'VISA' : 'MASTERCARD'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="form-field full-width">
                              <label>Cardholder Name</label>
                              <input 
                                type="text" 
                                value={cardDetails.cardHolder}
                                onChange={(e) => setCardDetails({ ...cardDetails, cardHolder: e.target.value.toUpperCase() })}
                                placeholder="FATIMA ZAHRA"
                                required
                              />
                            </div>
                          </div>

                          <div className="form-row two-cols">
                            <div className="form-field">
                              <label>Expiry Date (MM/YY)</label>
                              <input 
                                type="text" 
                                value={cardDetails.expiry}
                                onChange={handleExpiryChange}
                                placeholder="MM/YY"
                                maxLength="5"
                                required
                              />
                            </div>

                            <div className="form-field">
                              <label>CVV / CVC (3 Digits)</label>
                              <div className="input-with-badge">
                                <input 
                                  type="password" 
                                  value={cardDetails.cvv}
                                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.slice(0, 4) })}
                                  placeholder="•••"
                                  maxLength="4"
                                  required
                                />
                                <Lock size={15} className="cvv-lock-icon" />
                              </div>
                            </div>
                          </div>

                          <div className="save-card-checkbox">
                            <label className="checkbox-label">
                              <input 
                                type="checkbox" 
                                checked={cardDetails.saveCard}
                                onChange={(e) => setCardDetails({ ...cardDetails, saveCard: e.target.checked })}
                              />
                              <span>Save card details securely for future 1-click atelier checkout</span>
                            </label>
                          </div>
                        </div>

                        <div className="ssl-assurance-row">
                          <ShieldCheck size={16} />
                          <span>256-Bit SSL 3D Secure Protection &bull; Verified by Visa / Mastercard ID Check</span>
                        </div>
                      </div>
                    )}

                    {/* PAYMENT METHOD 2: COD */}
                    {paymentMethod === 'cod' && (
                      <div className="interactive-payment-panel cod-panel animate-fade">
                        <div className="cod-alert-box">
                          <Banknote size={24} className="cod-icon" />
                          <div>
                            <h5>Cash On Delivery (Available Nationwide)</h5>
                            <p>
                              Please keep exact cash amount ready of <strong>{formatPrice(grandTotal)}</strong> for the courier dispatch rider upon package handover.
                            </p>
                          </div>
                        </div>
                        <p className="cod-note">
                          &bull; Complimentary luxury packaging with gold wax seal included with COD orders.<br />
                          &bull; You will receive SMS dispatch notifications when out for delivery.
                        </p>
                      </div>
                    )}

                    {/* PAYMENT METHOD 3: EASYPAISA & JAZZCASH */}
                    {paymentMethod === 'easypaisa' && (
                      <div className="interactive-payment-panel wallet-panel animate-fade">
                        <div className="wallet-selector-row">
                          <button
                            type="button"
                            className={`wallet-sub-btn ${walletType === 'easypaisa' ? 'active' : ''}`}
                            onClick={() => setWalletType('easypaisa')}
                          >
                            EasyPaisa Mobile Account
                          </button>
                          <button
                            type="button"
                            className={`wallet-sub-btn ${walletType === 'jazzcash' ? 'active' : ''}`}
                            onClick={() => setWalletType('jazzcash')}
                          >
                            JazzCash Mobile Account
                          </button>
                        </div>

                        <div className="form-group" style={{ marginTop: '14px' }}>
                          <label>{walletType === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'} Account Mobile Number</label>
                          <input 
                            type="tel" 
                            value={walletPhone}
                            onChange={(e) => setWalletPhone(e.target.value)}
                            placeholder="03XX-XXXXXXX"
                            required
                          />
                        </div>

                        <div className="wallet-prompt-box">
                          <Smartphone size={18} />
                          <span>
                            Upon clicking "Place Order", a biometric prompt will appear on your {walletType === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'} mobile app to authorize <strong>{formatPrice(grandTotal)}</strong>.
                          </span>
                        </div>
                      </div>
                    )}

                    {/* PAYMENT METHOD 4: BANK WIRE / RAAST */}
                    {paymentMethod === 'bank' && (
                      <div className="interactive-payment-panel bank-panel animate-fade">
                        <div className="bank-info-box">
                          <div className="bank-details-grid">
                            <div>
                              <span className="lbl">Bank Name:</span>
                              <strong>Meezan Bank Ltd. (Islamic Branch)</strong>
                            </div>
                            <div>
                              <span className="lbl">Account Title:</span>
                              <strong>OLIVÉRA COUTURE PRIVATE LTD</strong>
                            </div>
                            <div>
                              <span className="lbl">Raast ID:</span>
                              <strong>+92 321 6548900</strong>
                            </div>
                            <div>
                              <span className="lbl">IBAN:</span>
                              <div className="iban-copy-row">
                                <code className="iban-code">PK36MEZN0001020304050607</code>
                                <button type="button" onClick={copyIban} className="btn-copy-iban">
                                  {copiedIban ? <Check size={14} /> : <Copy size={14} />}
                                  <span>{copiedIban ? 'Copied' : 'Copy'}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group" style={{ marginTop: '12px' }}>
                          <label>Transaction Reference ID / Bank Slip Number</label>
                          <input 
                            type="text" 
                            placeholder="e.g. FT262849019 or sender account title"
                            value={bankRef}
                            onChange={(e) => setBankRef(e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="form-actions-row">
                      <button 
                        type="button" 
                        className="btn btn-outline-olive"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </button>

                      <button type="submit" className="btn btn-primary btn-lg step-continue-btn">
                        <span>Place Order &bull; {formatPrice(grandTotal)}</span>
                        <CheckCircle size={18} />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Order Summary Side */}
              <div className="checkout-summary-side">
                <h4 className="summary-title">Order Overview ({cart.length} Pieces)</h4>

                <div className="checkout-items-preview">
                  {cart.map((item) => (
                    <div key={item.itemKey} className="checkout-item-row">
                      <img src={item.product.images[0]} alt={item.product.name} />
                      <div className="checkout-item-details">
                        <span className="item-title">{item.product.name}</span>
                        <span className="item-meta">Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</span>
                      </div>
                      <span className="item-price">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="checkout-cost-breakdown">
                  <div className="cost-row">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartSubtotal)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="cost-row discount-text">
                      <span>Promo ({appliedCoupon.code})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="cost-row">
                    <span>Delivery</span>
                    <span>{shippingCostFinal === 0 ? 'FREE' : formatPrice(shippingCostFinal)}</span>
                  </div>

                  <div className="cost-row grand-total-row">
                    <span>Total Due</span>
                    <span className="total-amount">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <div className="delivery-commitment-box">
                  <Truck size={18} className="commitment-icon" />
                  <p>
                    Estimated delivery: <strong>Thursday, Oct 30 - Friday, Oct 31</strong>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Order Placed Success Confirmation Screen */
            <div className="order-confirmation-view animate-fade">
              <div className="confirmation-header">
                <div className="success-check-bubble">
                  <CheckCircle size={44} />
                </div>
                <span className="confirmation-eyebrow">Thank You For Your Patronage</span>
                <h2 className="confirmation-title">Your Order Has Been Placed!</h2>
                <p className="confirmation-desc">
                  An official receipt has been dispatched to <strong>{formData.email}</strong>. Our atelier team is preparing your garments with bespoke tissue wrapping and gold wax seals.
                </p>
              </div>

              <div className="invoice-card glass-panel">
                <div className="invoice-header-row">
                  <div>
                    <span className="invoice-label">Tracking Order Reference:</span>
                    <h3 className="invoice-order-id">{generatedOrderId}</h3>
                  </div>
                  <div>
                    <span className="invoice-label">Payment Mode:</span>
                    <strong className="invoice-val">
                      {paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod === 'card' ? 'Credit Card (Visa)' : paymentMethod === 'easypaisa' ? 'Mobile Wallet' : 'Bank Transfer'}
                    </strong>
                  </div>
                </div>

                <div className="invoice-details-grid">
                  <div className="invoice-block">
                    <span className="block-title">Shipping Address:</span>
                    <p>{formData.fullName}</p>
                    <p>{formData.address}</p>
                    <p>{formData.city}, Pakistan ({formData.postalCode})</p>
                    <p>Phone: {formData.phone}</p>
                  </div>

                  <div className="invoice-block">
                    <span className="block-title">Order Total:</span>
                    <p className="total-paid-figure">{formatPrice(grandTotal)}</p>
                    <span className="invoice-badge-status">Status: Processing in Atelier</span>
                  </div>
                </div>
              </div>

              {/* Direct Next Step Action Buttons */}
              <div className="confirmation-actions-row">
                <button 
                  className="btn btn-primary btn-lg action-track-btn" 
                  onClick={handleTrackDirectly}
                >
                  <Truck size={18} />
                  <span>⚡ Track Consignment Live</span>
                </button>

                <button 
                  className="btn btn-outline-olive btn-lg" 
                  onClick={handleViewOrders}
                >
                  <span>View in My Orders</span>
                </button>

                <button className="btn btn-outline-olive" onClick={handlePrint}>
                  <Printer size={16} />
                  <span>Print Invoice</span>
                </button>

                <button 
                  className="btn btn-outline-olive"
                  onClick={() => setIsCheckoutOpen(false)}
                >
                  <ShoppingBag size={16} />
                  <span>Return To Shop</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
