const User = require('../models/userModel');

const isAuthorized = async (currentUserId, authorId) => {
  const userInfo = await User.findOne({ _id: currentUserId });
  return userInfo.role === 'admin' || userInfo.id === authorId;
};

const isAdmin = async (currentUserId) => {
  const userInfo = await User.findOne({ _id: currentUserId });
  return userInfo.role === 'admin';
};

module.exports = {
  isAuthorized,
  isAdmin,
};
