const Topic = require('../models/topicModel');
const { isAdmin } = require('../utils/Authorization');

const getById = async (req, res) => {
  try {
    res.status(200).json({
      message: 'Get topic successfully',
      data: await Topic.find({ _id: req.params.id }),
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    res.status(200).json({
      message: 'Get topic successfully',
      data: await Topic.find(),
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    if (!isAdmin(req.user.id)) {
      return res.status(401).json({
        message: 'Not authorization',
      });
    }

    const newTopic = await Topic.create({
      ...req.body,
    });

    res.status(200).json({
      message: 'Create topic successfully',
      data: [newTopic],
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  const updatedTopic = req.body.updatedTopic;
  try {
    const updated = await Topic.findByIdAndUpdate(
      req.params.id,
      { name: updatedTopic },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: 'Update topic successfully',
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const deleteTopic = async (req, res) => {
  try {
    await Topic.findByIdAndDelete(req.body.id);
    res.status(200).json({
      message: 'Delete topic successfully',
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteTopic,
};
