const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash : {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        postalCode: String,
        country: String
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