import React from 'react';

// 🛒 EXPANDED INDIAN MARKETPLACE INVENTORY
const INDIAN_PRODUCTS = [
  {
    id: 'prod_1',
    name: 'Wireless Bluetooth Headset',
    price: 2000,
    description: 'High fidelity audio soundscapes with active external noise cancellation.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'prod_2',
    name: 'Ergonomic Mechanical Keyboard',
    price: 1500,
    description: 'Tactile mechanical switches with highly customizable radiant RGB backlit setups.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'prod_3',
    name: 'Ultra-Wide Gaming Monitor',
    price: 25000,
    description: '34-inch curved immersive desktop layout sporting ultra-high-refresh panels.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'prod_4',
    name: 'Smart Fitness Smartwatch',
    price: 2500,
    description: 'Real-time biological vital tracking with integrated active GPS navigation support.',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'prod_5',
    name: 'Precision Wireless Gaming Mouse',
    price: 1800,
    description: 'Ultra-lightweight high-performance optical sensor with zero latency tracking response.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'prod_6',
    name: 'Minimalist Leather Backpack',
    price: 3200,
    description: 'Premium weather-resistant materials structured for laptop storage allocation.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'prod_7',
    name: 'Noise Cancelling Earbuds',
    price: 4500,
    description: 'True wireless stereo audio featuring ultra-deep bass and IPX7 sweat-proofing.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'prod_8',
    name: '4K Ultra HD Dashcam',
    price: 6800,
    description: 'Wide-angle lens vehicular safety camera with built-in night vision capabilities.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&auto=format&fit=crop&q=60'
  }
];

function ProductList({ addToCart }) {
  // Safe execution: fallback to local array if fallback array props are missing or empty
  const itemsToDisplay = INDIAN_PRODUCTS;

  return (
    <div>
      <h2 style={titleStyle}>✨ Featured Products</h2>
      <div style={gridContainerStyle}>
        {itemsToDisplay.map((product) => (
          <div key={product.id} style={cardStyle}>
            <div style={imageContainerStyle}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={imageStyle} 
                onError={(e) => {
                  // Fallback placeholder image if layout assets fail loading
                  e.target.src = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60";
                }}
              />
            </div>
            <div style={infoContainerStyle}>
              <h3 style={productNameStyle}>{product.name}</h3>
              <p style={descriptionStyle}>{product.description}</p>
              <div style={footerRowStyle}>
                <span style={priceStyle}>₹{product.price.toLocaleString('en-IN')}</span>
                <button 
                  onClick={() => addToCart(product)} 
                  style={addButtonStyle}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 🎨 CLEAN DESIGNS SYSTEM STYLES
// ==========================================
const titleStyle = { margin: '0 0 25px 0', fontSize: '24px', color: '#1a1a24', fontWeight: 'bold' };
const gridContainerStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '25px', width: '100%' };
const cardStyle = { background: '#ffffff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s ease' };
const imageContainerStyle = { width: '100%', height: '180px', backgroundColor: '#f0f0f0' };
const imageStyle = { width: '100%', height: '100%', objectFit: 'cover' };
const infoContainerStyle = { padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 };
const productNameStyle = { fontSize: '16px', fontWeight: '600', color: '#1a1a24', margin: '0 0 8px 0' };
const descriptionStyle = { fontSize: '13px', color: '#666', lineHeight: '1.4', margin: '0 0 16px 0', flexGrow: 1 };
const footerRowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' };
const priceStyle = { fontSize: '18px', fontWeight: 'bold', color: '#ffaa00' };
const addButtonStyle = { background: '#ffaa00', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' };

export default ProductList;