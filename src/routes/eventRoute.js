const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticate } = require('../middlewares/auth');

router.post('/', authenticate, eventController.create);
router.get('/:id', eventController.getById);
router.get('/', eventController.getAll);
router.delete('/:id', eventController.delete);
router.put('/:id', eventController.update);
router.post('/joinEvent', authenticate, eventController.join);
router.post('/leaveEvent', authenticate, eventController.leave);

module.exports = router;
