const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected")
    } catch (error) {
        console.log("MongoDB failed to connect:", error.message)
        process.exit(1);
    }
}

module.exports = connectDB;