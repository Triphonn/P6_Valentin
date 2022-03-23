const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const signUpSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// To verify Email is unique
signUpSchema.plugin(uniqueValidator, {
    message: "L'email a déjà été utilisé !",
});

module.exports = mongoose.model('User', signUpSchema);
