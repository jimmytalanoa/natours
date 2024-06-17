const mongoose = require('mongoose');
const validator = require('validator');

// name, email, photo, password, passwordconfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [
      40,
      'A user name must have less than or equal to 40 characters',
    ],

    validator: [validator.isAlpha, 'User name must only contain characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must have more than or equal to 8 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
