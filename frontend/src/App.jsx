import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import MyOrders from './components/MyOrders';
import Profile from './components/Profile';

function App() {
  // ==========================================
  // 1. STATE MANAGEMENT
  // ==========================================
  const [view, setView] = useState('products');
  const [cartItems, setCartItems] = useState([]);
  
  // 🔐 AUTHENTICATION STATES
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });

  // OTP Verification Form States
  const [loginForm, setLoginForm] = useState({ username: '', email: '', password: '' });
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  
  // 🔥 SUCCESS BANNER TRANSIENT STATE
  const [loginSuccessMessage, setLoginSuccessMessage] = useState('');

  // ==========================================
  // 2. HELPER CALCULATIONS
  // ==========================================
  const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ==========================================
  // 3. AUTHENTICATION & OTP LOGIC
  // ==========================================
  const handleInputChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  // Step A: Request OTP
  const handleRequestOtp = (e) => {
    e.preventDefault();
    if (!loginForm.username || !loginForm.email || !loginForm.password) {
      alert("Please fill in all fields!");
      return;
    }
    
    const mockOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(mockOtp);
    setOtpSent(true);
  };

  // Step B: Verify OTP & Establish Persistent Session (No Alert Popups)
  const handleVerifyAndLogin = (e) => {
    e.preventDefault();
    if (enteredOtp === generatedOtp) {
      // 🚨 Display the inline success message inside the layout instead of a browser alert!
      setLoginSuccessMessage(`🎉 Welcome back, ${loginForm.username}!`);
      
      // Hold the view for 1.5 seconds so the user can actually see the confirmation animation, then login
      setTimeout(() => {
        setIsLoggedIn(true);
        setUsername(loginForm.username);
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', loginForm.username);
        
        // Reset local input flags
        setLoginSuccessMessage('');
      }, 1500);

    } else {
      alert("❌ Invalid OTP code. Please try again.");
    }
  };

  // Step C: Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setOtpSent(false);
    setEnteredOtp('');
    setLoginForm({ username: '', email: '', password: '' });
    
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
  };

  // ==========================================
  // 4. CART CORE ACTIONS
  // ==========================================
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => (item._id || item.id) === (product._id || product.id));
      if (itemExists) {
        return prevItems.map((item) =>
          (item._id || item.id) === (product._id || product.id) ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => (item._id || item.id) !== id));
  };

  const updateQuantity = (id, newQty) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => ((item._id || item.id) === id ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // ==========================================
  // 5. RENDERING LAYERS
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div style={loginContainerStyle}>
        <div style={loginCardStyle}>
          <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#1a1a24' }}>
            🛒 MAYA's Portal Login
          </h2>
          
          {/* 🔥 INLINE SUCCESS MESSAGE SPLASH PANEL */}
          {loginSuccessMessage ? (
            <div style={inlineSuccessBoxStyle}>
              {loginSuccessMessage}
              <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.8 }}>Entering marketplace...</div>
            </div>
          ) : !otpSent ? (
            /* PHASE 1: LOGIN DETAILS */
            <form onSubmit={handleRequestOtp} style={formStyle}>
              <label style={labelStyle}>Username</label>
              <input 
                type="text" name="username" value={loginForm.username} 
                onChange={handleInputChange} style={inputStyle} placeholder="Enter your username" required 
              />

              <label style={labelStyle}>Email Address</label>
              <input 
                type="email" name="email" value={loginForm.email} 
                onChange={handleInputChange} style={inputStyle} placeholder="name@example.com" required 
              />

              <label style={labelStyle}>Password</label>
              <input 
                type="password" name="password" value={loginForm.password} 
                onChange={handleInputChange} style={inputStyle} placeholder="••••••••" required 
              />

              <button type="submit" style={loginBtnStyle}>Send Verification OTP</button>
            </form>
          ) : (
            /* PHASE 2: VERIFY OTP SCREEN */
            <form onSubmit={handleVerifyAndLogin} style={formStyle}>
              
              {/* OTP Code Meta Box */}
              <div style={inlineAlertBoxStyle}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
                  🔐 OTP Sent to {loginForm.email}!
                </div>
                <div style={{ fontSize: '13px', opacity: 0.9 }}>
                  Your verification code is: <strong style={{ fontSize: '16px', color: '#fff', textDecoration: 'underline' }}>{generatedOtp}</strong>
                </div>
              </div>

              <label style={labelStyle}>Enter OTP Code</label>
              <input 
                type="text" value={enteredOtp} 
                onChange={(e) => setEnteredOtp(e.target.value)} 
                style={{ ...inputStyle, textAlign: 'center', letterSpacing: '8px', fontSize: '20px', fontWeight: 'bold' }} 
                placeholder="0000" maxLength="4" required 
              />

              <button type="submit" style={{ ...loginBtnStyle, background: '#28a745' }}>Verify & Enter Store</button>
              
              <button type="button" onClick={() => setOtpSent(false)} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', marginTop: '15px', fontSize: '14px' }}>
                ← Back to Edit Details
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" style={appContainerStyle}>
      {/* NAVBAR */}
      <nav className="navbar" style={navbarStyle}>
        <div className="logo" style={logoStyle}>MAYA's Shopping Cart 🛒</div>
        <div className="nav-links" style={navLinksStyle}>
          <span style={welcomeBannerStyle}>🔥 Welcome, <strong style={{ color: '#ffaa00' }}>{username}</strong></span>
          <button onClick={() => setView('products')} style={view === 'products' ? activeBtnStyle : navBtnStyle}>Products</button>
          <button onClick={() => setView('orders')} style={view === 'orders' ? activeBtnStyle : navBtnStyle}>My Orders</button>
          <button onClick={() => setView('profile')} style={view === 'profile' ? activeBtnStyle : navBtnStyle}>👤 Profile</button>
          <button onClick={() => setView('cart')} style={view === 'cart' ? activeBtnStyle : navBtnStyle}>
            Cart {totalCartCount > 0 && `(${totalCartCount})`}
          </button>
          <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
        </div>
      </nav>

      {/* VIEWS */}
      <main className="main-content" style={mainContentStyle}>
        {view === 'products' && <ProductList addToCart={addToCart} />}
        {view === 'orders' && <MyOrders />}
        {view === 'profile' && <Profile />}
        {view === 'cart' && (
          <Cart 
            cartItems={cartItems} totalCartPrice={totalCartPrice} 
            clearCart={clearCart} removeFromCart={removeFromCart} updateQuantity={updateQuantity}
          />
        )}
      </main>
    </div>
  );
}

// ==========================================
// 🎨 LAYOUT DESIGN SYSTEM STYLES
// ==========================================
const loginContainerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f6f9' };
const loginCardStyle = { background: '#ffffff', padding: '35px 40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' };
const formStyle = { display: 'flex', flexDirection: 'column' };
const labelStyle = { fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '6px', marginTop: '12px' };
const inputStyle = { padding: '10px 14px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '15px', outline: 'none' };
const loginBtnStyle = { background: '#ffaa00', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '25px' };

const inlineAlertBoxStyle = {
  backgroundColor: '#1a1a24',
  color: '#ffffff',
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '20px',
  textAlign: 'center',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  borderLeft: '4px solid #ffaa00'
};

/* 🔥 STYLING FOR THE NEW NATIVE SUCCESS BANNER CONTAINER */
const inlineSuccessBoxStyle = {
  backgroundColor: '#28a745',
  color: '#ffffff',
  padding: '25px 15px',
  borderRadius: '8px',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '16px',
  boxShadow: '0 4px 12px rgba(40,167,69,0.2)',
  animation: 'fadeIn 0.3s ease'
};

const appContainerStyle = { minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: '"Segoe UI", Roboto, sans-serif' };
const navbarStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: '#1a1a24', color: '#fff', position: 'sticky', top: 0, zIndex: 1000 };
const logoStyle = { fontSize: '22px', fontWeight: 'bold' };
const navLinksStyle = { display: 'flex', alignItems: 'center', gap: '15px' };
const welcomeBannerStyle = { marginRight: '15px', fontSize: '14px', color: '#ddd' };
const navBtnStyle = { background: 'none', border: 'none', color: '#bbb', padding: '8px 16px', fontSize: '15px', fontWeight: '500', cursor: 'pointer', borderRadius: '4px' };
const activeBtnStyle = { ...navBtnStyle, color: '#fff', backgroundColor: '#ffaa00' };
const logoutBtnStyle = { background: '#dc3545', border: 'none', color: '#fff', padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' };
const mainContentStyle = { padding: '30px 20px', maxWidth: '1200px', margin: '0 auto' };

export default App;