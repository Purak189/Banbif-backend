const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user");
const multer = require('multer');
const path = require('path');

// Configuración de Multer para la nueva ubicación
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploadsFiles/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Importing the user controller
const router = express.Router();

const getUserByEmail = require('../services/user'); 

// Create user
router.post('/user', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new userSchema({
            ...req.body,
            password: hashedPassword,
        });

        const data = await user.save();
        res.json(data);
    } catch (error) {
        res.json({ message: error });
    }
});

// Get all users
router.get('/user', (req, res) => {
   userSchema
   .find()
   .then((data) => res.json(data))
   .catch((error) => res.json({message: error}))
});

// Get user by id
router.get('/user/:id', (req, res) => {
    userSchema
    .findById(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

// Update a user
router.put('/user/:id', upload.single('profilePicture'), (req, res) => {
    const { id } = req.params;
    const { phoneNumber } = req.body;
    const profilePicture = req.file ? req.file.path : null;

    let updateData = { phoneNumber };
    if (profilePicture) {
      updateData.profilePicture = profilePicture;
    }

    userSchema
      .updateOne({ _id: id }, { $set: updateData })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

// Delete a user
router.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

router.post('/sign-in', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(404).send('Usuario no encontrado');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send('Contraseña incorrecta');
      }
  
      const token = jwt.sign({ id: user.id }, 'banbifBDTok$nPa$%', { expiresIn: '1h' });
  
      res.send({ token, userId: user.id });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
