const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true,
        expires: 0 // MongoDB TTL index automatically removes expired tokens from DB
    }
});

module.exports = mongoose.model('TokenBlacklist', tokenBlacklistSchema);
