const express = require('express');
// DB Mongoose
const mongoose = require('mongoose');
// to parse application/json
const bodyParser = require('body-parser');
// Data Sanitization against NoSQL Injection Attacks
const mongoSanitize = require('express-mongo-sanitize');

require('dotenv').config();

// Routes de l'api
const authRoutes = require('./routes/auth');
const sauceRoutes = require('./routes/sauce');

const path = require('path');
const app = express();

// DB Connect
mongoose
    .connect(
        `mongodb+srv://${process.env.DB_HOST}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.qv4kd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
        }
    )
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err));

// Apply CORS policy
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});

// Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());
//

// Prevent DOS attacks
app.use(express.json());
//

// parse application/json
app.use(bodyParser.json());
//

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', authRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;
