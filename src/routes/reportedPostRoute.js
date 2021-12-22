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
router.post('/reported-post', authMiddleware.authenticate, create);
router.put('/reported-post/:postId', authMiddleware.authenticate, update);
router.delete('/reported-post/:postId', authMiddleware.authenticate, remove);
router.get('/reported-post', list);

router.param('postId', reportedPostById);

module.exports = router;