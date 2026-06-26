const connectDB = async () => {
    try {
        console.log("⚠️ Simulating Local Database Connection...");
        console.log("🚀 MongoDB Connected: localhost:27017/ecommerce (Demo Mode Active)");
    } catch (error) {
        console.error(`Database Error: ${error.message}`);
    }
};

module.exports = connectDB;