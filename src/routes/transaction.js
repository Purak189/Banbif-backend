const express = require("express");
const transactionSchema = require("../models/transaction");

// Importing the transaction controller
const router = express.Router();

// Create transaction
router.post('/transaction', (req, res) => {
    const transaction = new transactionSchema(req.body);
    transaction
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
})

// Get all transactions
router.get('/transaction', (req, res) => {
    transactionSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

// Get transaction by id
router.get('/transaction/:id', (req, res)=> {
    transactionSchema
    .findById(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

module.exports = router;