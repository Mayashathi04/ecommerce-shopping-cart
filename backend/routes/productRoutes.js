const express = require('express');
const router = express.Router();
const { sendEmailOTP } = require('../utils/otpService');
const Order = require('../models/orderModel');

// 1. This is your catalog array with the updated prices
const currentProductCatalogData = [
    { _id: "1", name: "Wireless Bluetooth Headset", description: "High-fidelity audio soundscapes with active external noise cancellation features.", price: 2000.00, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" },
    { _id: "2", name: "Ergonomic Mechanical Keyboard", description: "Tactile mechanical switches with highly customizable radiant RGB backlit profiles.", price: 1500.00, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80" },
    { _id: "3", name: "Ultra-Wide Gaming Monitor", description: "34-inch curved immersive desktop layout sporting ultra-high-refresh response rates.", price: 25000.00, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80" },
    { _id: "4", name: "Smart Fitness Smartwatch", description: "Real-time biological vital tracking with integrated active GPS navigation overlays.", price: 2500.00, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80" },
    { _id: "5", name: "Precision Wireless Gaming Mouse", description: "Ultra-lightweight high-performance chassis supporting zero-latency optical tracking.", price: 800.00, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80" },
    { _id: "6", name: "Minimalist Leather Backpack", description: "Premium weather-resistant materials structured perfectly with dedicated laptop compartments.", price: 1100.00, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80" }
];

// Temporary server memory storage to keep track of active OTPs generated
let activeOTPSessionStore = {};

// ROUTE A: Fetch Products
router.get('/', (req, res) => {
    res.json(currentProductCatalogData);
});

// ROUTE B: Generate & Send Real Email OTP
router.post('/api/auth/request-otp', async (req, res) => {
    const { username, method, contact } = req.body;

    if (!contact) {
        return res.status(400).json({ success: false, message: 'Contact address missing' });
    }

    // Generate a random, real 4-digit code (e.g., 4731)
    const generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Save token to temporary session storage
    activeOTPSessionStore[contact.trim()] = generatedOTP;

    try {
        if (method === 'email') {
            await sendEmailOTP(contact.trim(), generatedOTP, username);
            res.json({ success: true, message: 'Real OTP email dispatched!' });
        } else {
            // Fallback for demo phone number logins if SMS service credentials aren't set up yet
            console.log(`📱 Demo Phone OTP for ${contact}: ${generatedOTP}`);
            res.json({ success: true, message: `Demo Mode: Verification token is ${generatedOTP}` });
        }
    } catch (error) {
        console.error("Mailing Error Details:", error);
        res.status(500).json({ success: false, message: 'Failed to send verification code email.' });
    }
});

// ROUTE C: Verify the typed code
router.post('/api/auth/verify-otp', (req, res) => {
    const { contact, otpValue } = req.body;
    const storedOTP = activeOTPSessionStore[contact.trim()];

    if (storedOTP && storedOTP === otpValue.trim()) {
        delete activeOTPSessionStore[contact.trim()]; // Clear token upon success
        return res.json({ success: true, message: 'Authenticated!' });
    }
    res.status(401).json({ success: false, message: 'Invalid OTP code sequence.' });
});

// Route to cancel an order
router.put('/api/orders/:id/cancel', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = 'Cancelled';
    await order.save();

    res.json({ success: true, message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route to cancel an order
router.put('/api/orders/:id/cancel', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = 'Cancelled';
    await order.save();

    res.json({ success: true, message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Local mock profile address persistence
let defaultUserProfileAddress = null;

// Route 1: Save Profile Address
router.post('/api/profile/address', (req, res) => {
  defaultUserProfileAddress = req.body;
  res.json({ success: true });
});

// Route 2: Get Profile Address
router.get('/api/profile/address', (req, res) => {
  if (!defaultUserProfileAddress) return res.status(404).json(null);
  res.json(defaultUserProfileAddress);
});

// Route 3: Modified Order Placement (Combines Cart items with Profile Address)
router.post('/api/orders', async (req, res) => {
  try {
    if (!defaultUserProfileAddress) {
      return res.status(400).json({ success: false, message: "Please set your delivery address in your Profile configuration first." });
    }

    const newOrder = new Order({
      items: req.body.items,
      totalPaid: req.body.totalPaid,
      shippingAddress: defaultUserProfileAddress // Implicitly pulled from user's account dashboard settings!
    });

    await newOrder.save();
    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;