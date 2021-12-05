const Event = require('../models/eventModel');
const { isAdmin } = require('../utils/Authorization');

module.exports = {
  create: async (req, res) => {
    try {
      if (!isAdmin(req.user.id)) {
        return res.status(400).json({
          message: 'Not authorization',
        });
      }

      const newEvent = await Event.create({
        creator: req.user.id,
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
  getAll: async (req, res) => {
    try {
      const eventList = await Event.find().populate('creator', 'name');
      res.status(200).json({
        message: 'Get event list successfully',
        data: eventList,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const event = await Event.findOne({ _id: req.params.id });

      res.status(200).json({
        message: 'Get event list successfully',
        data: event,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  update: async (req, res) => {
    try {
      await Event.findOneAndUpdate(req.params.id, req.body.updatedEvent);

      res.status(200).json({
        message: 'Update event successfully',
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  delete: async (req, res) => {
    try {
      await Event.findOneAndRemove({ _id: req.params.id });

      res.status(200).json({
        message: 'Delete event successfully',
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  join: async (req, res) => {
    try {
      await Event.findOneAndUpdate(
        req.params.id,
        { $push: { registedStudent: req.user.id } },
        { new: true }
      );

      res.status(200).json({
        message: 'Join event successfully',
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  leave: async (req, res) => {
    try {
      await Event.findOneAndUpdate(
        req.params.id,
        { $pull: { registedStudent: req.user.id } },
        { new: true }
      );

      res.status(200).json({
        message: 'Leave event successfully',
      });
    } catch (error) {
      res.status(400).json({
        message: "Event doesn't exist",
      });
    }
  },
};
