const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

// Need to be tested as a middleware
// Can be use with Rate Limit Mongo to store data
// Limit number of request for login route
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
});
//

// Limit number of request for signup route
const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // start blocking after 5 requests
    message:
        'Trop de comptes créés à partir de cette IP, veuillez réessayer dans une heure',
});
//
//

const user = require('../controllers/auth');

router.post('/signup', createAccountLimiter, user.signUp);
router.post('/login', apiLimiter, user.login);

module.exports = router;
