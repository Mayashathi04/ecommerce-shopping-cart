import React, { useState, useEffect } from 'react';

function Orders() {
  const [orders, setOrders] = useState([]);

  // Load orders stored under 'userOrders' key
  useEffect(() => {
    const savedOrders = localStorage.getItem('userOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '20px', color: '#1a1a24', marginBottom: '15px' }}>
        📦 Your Order Fulfillment Dashboard ({orders.length} Orders Placed)
      </h2>

      {orders.length === 0 ? (
        <p style={{ color: '#666', fontSize: '14px' }}>You haven't placed any orders yet!</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={orderCardStyle}>
            <div style={orderHeaderStyle}>
              <span><strong>Order ID:</strong> {order.id}</span>
              <span><strong>Placed On:</strong> {order.date}</span>
              <span style={{ color: '#ffaa00', fontWeight: 'bold' }}>Total: ₹{order.totalAmount}</span>
            </div>
            
            <div style={{ padding: '15px' }}>
              <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}><strong>Items:</strong></p>
              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '5px' }}>
                  <span>{item.name} (x{item.quantity})</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              
              <div style={shippingDetailsBoxStyle}>
                📍 <strong>Deliver to:</strong> {order.shippingAddress.fullName}, {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.district} - {order.shippingAddress.pincode}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const orderCardStyle = {
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  marginBottom: '20px',
  overflow: 'hidden',
  border: '1px solid #eee'
};

const orderHeaderStyle = {
  background: '#f8f9fa',
  padding: '12px 15px',
  borderBottom: '1px solid #eee',
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px',
  flexWrap: 'wrap',
  gap: '10px'
};

const shippingDetailsBoxStyle = {
  marginTop: '15px',
  paddingTop: '10px',
  borderTop: '1px dashed #ddd',
  fontSize: '13px',
  color: '#555'
};

export default Orders;