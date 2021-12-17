const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/auth');

router.get('/:id', postController.getById);
router.get('/topic/:topicName', postController.getByTopic);
router.get('/', postController.getAll);
router.post('/', authMiddleware.authenticate, postController.create);
router.delete('/:id', authMiddleware.authenticate, postController.deleteById);
router.put('/:id', authMiddleware.authenticate, postController.update);
router.post('/:id/vote-up', authMiddleware.authenticate, postController.voteUp);
router.post(
  '/:id/vote-down',
  authMiddleware.authenticate,
  postController.voteDown
);
router.post(
  '/:id/comment',
  authMiddleware.authenticate,
  postController.comment
);
router.delete(
  '/:id/comment/:commentId',
  authMiddleware.authenticate,
  postController.deleteComment
);
router.put(
  '/:id/comment/:commentId',
  authMiddleware.authenticate,
  postController.updateComment
);
router.post(
  '/:postId/comment/:commentId/vote-up',
  authMiddleware.authenticate,
  postController.commentVoteUp
);
router.post(
  '/:postId/comment/:commentId/vote-down',
  authMiddleware.authenticate,
  postController.commentVoteDown
);

module.exports = router;
