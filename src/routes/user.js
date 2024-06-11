const express = require("express");
const userSchema = require("../models/user");

// Importing the user controller
const router = express.Router();

// Create user
router.post('/user', (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
})

// Get all users
router.get('/user', (req, res) => {
   userSchema
   .find()
   .then((data) => res.json(data))
   .catch((error) => res.json({message: error}))
})

// Get user by id
router.get('/user/:id', (req, res) => {
    userSchema
    .findById(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

// Update a user
router.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const { phoneNumber, profilePicture } = req.body;
    userSchema
    .updateOne({ _id: id }, { $set: { phoneNumber, profilePicture }})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

// Delete a user
router.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

module.exports = router;