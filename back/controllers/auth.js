const bcrypt = require('bcrypt');
const User = require('../models/signup');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Signup user
exports.signUp = (req, res, next) => {
    bcrypt
        // Hashing password
        .hash(req.body.password, 10)
        .then((hash) => {
            // Creating userData in DB
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            // Saving userData in DB
            user.save()
                .then(() =>
                    res.status(201).json({ message: 'Utilisateur crée' })
                )
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

// Login user
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            // If no user in DB return error
            if (!user) {
                return res
                    .status(401)
                    .json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt
                // Check password security
                .compare(req.body.password, user.password)
                .then((valid) => {
                    // If password is wrong return error
                    if (!valid) {
                        return res
                            .status(401)
                            .json({ error: 'Mot de passe incorrect !' });
                    }
                    // If the password is valid, connect the user
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.AUTH_TOKEN,
                            {
                                expiresIn: '24h',
                            }
                        ),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
