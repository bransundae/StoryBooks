const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

//Load User Model
require('../models/User');
const User = mongoose.model('users');

module.exports = router;