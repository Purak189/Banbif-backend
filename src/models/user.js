const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    security: {
        mfaEnabled: Boolean,
        mfaMethod: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);