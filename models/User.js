const mongoose = require('mongoose');

//TODO: check requires and make configurations <-----

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        validation: [/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, "Invalid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: [1, "First name is too short"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minLength: [1, "Last name is too short"],
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;