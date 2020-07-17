const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.post('/', [
    check('email', 'Add a valid Email').isEmail(),
    check('password', 'Password must be 6 characters or more').isLength({ min: 6 }),
], authController.authUser);

router.get('/', auth, authController.loggedUser);

module.exports = router;