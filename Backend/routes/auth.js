const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController')

router.post('/', [
    check('email', 'Add a valid Email').isEmail(),
    check('password', 'Password must be 6 characters or more').isLength({ min: 6 }),
], authController.authUser);

module.exports = router;