const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Add a valid Email').isEmail(),
    check('password', 'Password must be 6 characters or more').isLength({ min: 6 }),
], userController.createUser);

module.exports = router;