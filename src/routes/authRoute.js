const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/create-user', authController.create);
router.post('/signin', authController.signin);
// router.post('/reset-password', authController.resetPassword);

module.exports = router;
