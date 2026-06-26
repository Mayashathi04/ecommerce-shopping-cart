import mongoose from 'mongoose';

// 1. Define the Data Blueprint Schema for Products
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            default: 0.00
        },
        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true // Automatically tracks createdAt and updatedAt records
    }
);

// 2. Compile the Data Blueprint into an Executable Database Model
const Product = mongoose.model('Product', productSchema);

// 3. Fallback/Static Seeder Data Array containing Today's Exact Pricing
// Use this array for your seeding scripts or local development servers
export const currentProductCatalogData = [
    {
        _id: "1",
        name: "Wireless Bluetooth Headset",
        description: "High-fidelity audio soundscapes with active external noise cancellation features.",
        price: 2000.00, // Today's Exact Price
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
    },
    {
        _id: "2",
        name: "Ergonomic Mechanical Keyboard",
        description: "Tactile mechanical switches with highly customizable radiant RGB backlit profiles.",
        price: 1500.00, // Today's Exact Price
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80"
    },
    {
        _id: "3",
        name: "Ultra-Wide Gaming Monitor",
        description: "34-inch curved immersive desktop layout sporting ultra-high-refresh response rates.",
        price: 25000.00, // Today's Exact Price
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80"
    },
    {
        _id: "4",
        name: "Smart Fitness Smartwatch",
        description: "Real-time biological vital tracking with integrated active GPS navigation overlays.",
        price: 2500.00, // Today's Exact Price
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80"
    },
    {
        _id: "5",
        name: "Precision Wireless Gaming Mouse",
        description: "Ultra-lightweight high-performance chassis supporting zero-latency optical tracking.",
        price: 800.00, // Today's Exact Price
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80"
    },
    {
        _id: "6",
        name: "Minimalist Leather Backpack",
        description: "Premium weather-resistant materials structured perfectly with dedicated laptop compartments.",
        price: 1100.00, // Today's Exact Price
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80"
    }
];

export default Product;