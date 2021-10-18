const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/refreshToken', authController.refreshToken);
// router.patch('/edit/:userId', authMiddleware, userController.editUser);

module.exports = router;
