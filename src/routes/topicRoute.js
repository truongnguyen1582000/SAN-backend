const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');
const authMiddleware = require('../middlewares/auth');

router.get('/:id', topicController.getById);
router.get('/', topicController.getAll);
router.post('/', authMiddleware.authenticate, topicController.create);
router.put('/:id', authMiddleware.authenticate, topicController.update);
router.delete('/:id', authMiddleware.authenticate, topicController.deleteTopic);

module.exports = router;
