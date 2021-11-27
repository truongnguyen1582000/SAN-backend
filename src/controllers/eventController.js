const Event = require('../models/eventModel');

module.exports = {
  create: async (req, res) => {
    try {
      const newEvent = await Event.create({
        ...req.body,
      });
      res.status(200).json({
        message: 'Create event successfully',
        data: newEvent,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
