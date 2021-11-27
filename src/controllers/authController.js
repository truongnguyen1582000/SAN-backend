const bcrypt = require('bcrypt');
const JWT = require('../utils/JWT');
const User = require('../models/userModel');

const authController = {
  async signin(req, res) {
    try {
      const studentId = req.body.studentId;
      const password = req.body.password;

      const isExistUser = await User.findOne({
        studentId: studentId,
      }).populate(['posteds', 'events']);
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
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  },
  async create(req, res) {
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
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  },
};

module.exports = authController;
