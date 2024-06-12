const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    details: {
        fromAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        toAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        description: {
            type: String
        }
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);