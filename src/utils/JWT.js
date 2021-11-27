const jwt = require('jsonwebtoken');

module.exports.getToken = (userId) => {
  const user = {
    id: userId,
  };
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  return token;
};
