const express = require("express");
const transactionSchema = require("../models/transaction");
const User = require("../models/user")

// Importing the transaction controller
const router = express.Router();

// Create transaction
router.post('/transaction', (req, res) => {
    User.findById(req.body.details.toAccount)
        .then(user => {
            if (!user) {
                // Si el usuario no existe, envía un error y termina la ejecución aquí
                return res.status(404).json({ message: 'User not found' });
            }
            // Crear la transacción solo si el usuario existe
            const transaction = new transactionSchema(req.body);
            return transaction.save(); // Asegúrate de retornar esta promesa para encadenar correctamente
        })
        .then(data => {
            // Este bloque se ejecutará solo si la transacción se guarda correctamente
            if(data) {
                res.json(data);
            }
            // No es necesario un else aquí, ya que si el usuario no se encuentra, la ejecución se habrá terminado antes
        })
        .catch(error => res.status(500).json({ message: error.message }));
});

// Get all transactions
router.get('/transaction', (req, res) => {
    transactionSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

// Get transactions by userId
router.get('/transactions/user/:id', (req, res) => {
    transactionSchema
    .find({ userId: req.params.id })
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

module.exports = router;