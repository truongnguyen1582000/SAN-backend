const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticate } = require('../middlewares/auth');

router.post('/', authenticate, eventController.create);
router.get('/:id', eventController.read);
router.get('/', eventController.getAll);
// router.get('/', eventController.joinedList);
// router.get('/', eventController.attendedList);
router.delete('/:id', eventController.delete);
router.put('/:id', eventController.update);
router.post('/:id/join-event', authenticate, eventController.join);
router.post('/:id/leave-event', authenticate, eventController.leave);

router.param('id', eventController.eventById);

module.exports = router;