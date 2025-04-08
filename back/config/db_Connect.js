const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // إضافة strictQuery لتجنب التحذير
        mongoose.set("strictQuery", false);

        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });

        console.log("✅ Database is connected successfully!");
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1); // إيقاف التطبيق في حالة فشل الاتصال
    }
};

module.exports = connectDB;
