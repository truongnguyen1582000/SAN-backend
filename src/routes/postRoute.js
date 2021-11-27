const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/auth');

router.get('/:id', postController.getById);
router.get('/', postController.getAll);
router.post('/', authMiddleware.authenticate, postController.create);
router.delete('/:id', authMiddleware.authenticate, postController.deleteById);
// router.put('/:id', authMiddleware.authenticate, postController.update);
router.post('/vote-up', authMiddleware.authenticate, postController.create);
router.post('/vote-down', authMiddleware.authenticate, postController.create);
router.post('/comment', authMiddleware.authenticate, postController.create);

module.exports = router;
