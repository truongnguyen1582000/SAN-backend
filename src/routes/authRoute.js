const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');

router.get('/', authenticate, authController.getAll);
router.post('/create-user', authController.create);
router.post('/signin', authController.signin);
router.post('/change-password', authenticate, authController.changePassword);
router.post('/add-topic', authenticate, authController.addTopic);
router.post('/remove-topic', authenticate, authController.removeTopic);

module.exports = router;