const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            console.error('CRITICAL: MONGO_URI environment variable is missing in .env file.');
            process.exit(1);
        }

        const conn = await mongoose.connect(mongoURI);
        console.log(`Successfully connected to MongoDB Host: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
