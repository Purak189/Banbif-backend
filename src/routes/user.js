const express = require("express");

// Importing the user controller
const router = express.Router();

// Create user
router.post('/user', (req, res) => {
    res.send('Create user');
})

// Get all users
// router.get('/user', (req, res) => {
//     res.send('Get all users');
// })


module.exports = router;