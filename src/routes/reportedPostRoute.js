const express = require('express');
const router = express.Router();
const {
    create,
    reportedPostById,
    read,
    remove,
    update,
    list,
} = require('../controllers/reportedPost');
const authMiddleware = require('../middlewares/auth');

router.get('/reported-post/:postId', read);
router.post('/reported-post/:userId', authMiddleware.authenticate, create);
router.put(
    '/reported-post/:postId/:userId',
    authMiddleware.authenticate,
    update
);
router.delete(
    '/reported-post/:postId/:userId',
    authMiddleware.authenticate,
    remove
);
router.get('/reported-post', list);

router.param('postId', reportedPostById);

module.exports = router;