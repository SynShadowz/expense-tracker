const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
//const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

//connectDB();
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(PORT);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

const transactions = require('./routes/transactions');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(express.json());

// Use routes
app.use('/api/v1/transactions', transactions);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// app.listen(PORT);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('listening for requests');
    })
})