const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config();

//Importing routes
const userRouter = require('./routes/user');
const transactionRouter = require('./routes/transaction');

const app = express();
const port = process.env.PORT || 9000;
const cors = require('cors');

// Middleware
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200'
  }));

app.use('/api/v1', userRouter);
app.use('/api/v1', transactionRouter);

// Middleware para servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.get('/', (req, res) => {
    res.send('Welcome to my API');
})

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Archivo subido con éxito');
  });

// mongodb connection
mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to MongoDB container"))
.catch((err) => console.error(err))

app.listen(port, () => {
    console.log('Server is listning on port', port)
});
