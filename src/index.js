const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

//Importing routes
const userRouter = require('./routes/user');
const transactionRouter = require('./routes/transaction');

const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use('/api/v1', userRouter);
app.use('/api/v1', transactionRouter);

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to my API');
})

// mongodb connection
mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to MongoDB container"))
.catch((err) => console.error(err))

app.listen(port, () => {
    console.log('Server is listning on port', port)
});
