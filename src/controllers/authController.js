const bcrypt = require('bcrypt');
const JWT = require('../utils/JWT');
const User = require('../models/userModel');

const getAll = async (req, res) => {
  try {
    res.status(200).json({
      message: 'Get all user successfully',
      data: await User.find().populate('topics'),
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const signin = async (req, res) => {
  try {
    const studentId = req.body.studentId;
    const password = req.body.password;

    const isExistUser = await User.findOne({
      studentId: studentId,
    });

    if (!isExistUser) {
      return res.status(400).json({
        message: 'Your username or password is invalid',
      });
    }

    const isMatchPwd = await bcrypt.compare(password, isExistUser.password);

    if (!isMatchPwd) {
      return res.status(400).json({
        message: 'Your username or password is invalid',
      });
    }

    const token = JWT.getToken(isExistUser._id);
    isExistUser.password = undefined;

    res.status(200).json({
      message: 'Signed in successfully',
      token,
      data: isExistUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const isExistUser = await User.find({
      $or: [{ studentId: req.body.studentId }, { email: req.body.email }],
    });

    if (isExistUser.length !== 0) {
      return res.status(400).json({
        message: 'User already exist in system',
      });
    }

    // hash pwd and create
    const newUser = await User.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    });

    res.status(201).json({
      message: 'Create user successfully',
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const newPassword = req.body.newPassword;

    await User.findByIdAndUpdate(req.user.id, {
      password: await bcrypt.hash(newPassword, 10),
    });

    res.status(201).json({
      message: 'Update password successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const addTopic = async (req, res) => {
  const topicId = req.body.topicId;
  try {
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { topics: topicId } },
      { new: true }
    );
    res.status(400).json({
      message: 'Add topic successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const removeTopic = async (req, res) => {
  const topicId = req.body.topicId;
  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { topic: { _id: topicId } } },
      { new: true }
    );
    res.status(400).json({
      message: 'Remove topic successfully',
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  create,
  signin,
  removeTopic,
  addTopic,
  changePassword,
  getAll,
};
