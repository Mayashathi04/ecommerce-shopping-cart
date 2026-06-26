import React, { useState } from 'react';

function Cart({ cartItems, totalCartPrice, clearCart, removeFromCart, updateQuantity }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePlaceOrder = () => {
    setErrorMessage('');
    setSuccessMessage('');

    const savedProfile = localStorage.getItem('userProfile');
    if (!savedProfile) {
      setErrorMessage('❌ Failed to place order. Make sure your address is set in your Profile tab!');
      return;
    }

    const profile = JSON.parse(savedProfile);
    if (!profile.fullName || !profile.address || !profile.pincode || !profile.city || !profile.district) {
      setErrorMessage('❌ Failed to place order. Make sure your address is set in your Profile tab!');
      return;
    }

    // 🔥 NEW: SAVE THE ORDER DATA BEFORE CLEARING THE CART
    const newOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000), // Random Order ID
      date: new Date().toLocaleDateString(),
      items: [...cartItems],
      totalAmount: totalCartPrice,
      shippingAddress: profile
    };

    // Get existing orders from storage, or start a fresh array
    const existingOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
    existingOrders.unshift(newOrder); // Add new order to the top of the list
    localStorage.setItem('userOrders', JSON.stringify(existingOrders)); // Save back to localStorage

    // Show inline banner
    setSuccessMessage('🎉 Order placed successfully!');

    setTimeout(() => {
      clearCart();
      setSuccessMessage('');
    }, 2500);
  };

  return (
    <div style={cartLayoutStyle}>
      {/* LEFT SIDE: CART ITEMS LIST */}
      <div style={cartItemsSectionStyle}>
        <h2 style={sectionHeaderStyle}>🛒 Shopping Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</h2>
        {cartItems.length === 0 && !successMessage ? (
          <p style={{ color: '#666' }}>Your cart is empty.</p>
        ) : cartItems.length === 0 && successMessage ? (
          <p style={{ color: '#28a745', fontWeight: '600' }}>Processing your order details...</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id || item.id} style={itemCardStyle}>
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                <p style={{ margin: 0, color: '#ffaa00', fontWeight: 'bold' }}>₹{item.price}</p>
              </div>
              <div style={actionsRowStyle}>
                <button onClick={() => updateQuantity(item._id || item.id, Math.max(1, item.quantity - 1))} style={qtyBtnStyle}>-</button>
                <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)} style={qtyBtnStyle}>+</button>
                <button onClick={() => removeFromCart(item._id || item.id)} style={removeBtnStyle}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* RIGHT SIDE: ORDER SUMMARY CARD */}
      <div style={summaryCardStyle}>
        <h3 style={{ margin: '0 0 15px 0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Summary</h3>
        <div style={summaryRowStyle}>
          <span>Items Total:</span>
          <span>₹{totalCartPrice}</span>
        </div>
        <div style={summaryRowStyle}>
          <span>Delivery Charges:</span>
          <span style={{ color: '#28a745', fontWeight: 'bold' }}>FREE</span>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '15px 0' }} />
        <div style={{ ...summaryRowStyle, fontSize: '18px', fontWeight: 'bold' }}>
          <span>Grand Total:</span>
          <span style={{ color: '#ffaa00' }}>₹{totalCartPrice}</span>
        </div>

        <p style={deliveryNoticeStyle}>
          📍 This order will ship directly to your default address configured under your **Profile tab**.
        </p>

        {/* INLINE ERROR BANNER */}
        {errorMessage && <div style={inlineErrorBoxStyle}>{errorMessage}</div>}

        {/* INLINE SUCCESS BANNER */}
        {successMessage && <div style={inlineSuccessBoxStyle}>{successMessage}</div>}

        <button 
          onClick={handlePlaceOrder} 
          disabled={cartItems.length === 0 || successMessage} 
          style={{ 
            ...checkoutBtnStyle, 
            opacity: (cartItems.length === 0 || successMessage) ? 0.6 : 1, 
            cursor: (cartItems.length === 0 || successMessage) ? 'not-allowed' : 'pointer' 
          }}
        >
          {successMessage ? 'Placing Order...' : 'Confirm & Place Order'}
        </button>
      </div>
    </div>
  );
}

// Styling parameters
const cartLayoutStyle = { display: 'flex', gap: '30px', alignItems: 'flex-start', flexWrap: 'wrap' };
const cartItemsSectionStyle = { flex: 2, minWidth: '320px' };
const sectionHeaderStyle = { margin: '0 0 20px 0', fontSize: '22px', color: '#1a1a24' };
const itemCardStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '15px 20px', borderRadius: '6px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' };
const actionsRowStyle = { display: 'flex', alignItems: 'center', gap: '10px' };
const qtyBtnStyle = { background: '#e0e0e0', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };
const removeBtnStyle = { background: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' };
const summaryCardStyle = { flex: 1, minWidth: '300px', background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' };
const summaryRowStyle = { display: 'flex', justifyContent: 'space-between', margin: '8px 0', fontSize: '15px', color: '#444' };
const deliveryNoticeStyle = { fontSize: '12px', color: '#666', background: '#f9f9f9', padding: '10px', borderRadius: '4px', marginTop: '15px', borderLeft: '3px solid #ffaa00', lineHeight: '1.4' };
const checkoutBtnStyle = { width: '100%', background: '#ffaa00', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', marginTop: '15px', transition: 'background 0.2s' };
const inlineErrorBoxStyle = { backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', padding: '12px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', marginTop: '15px', textAlign: 'center', lineHeight: '1.4' };
const inlineSuccessBoxStyle = { backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', padding: '12px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', marginTop: '15px', textAlign: 'center', lineHeight: '1.4' };

export default Cart;