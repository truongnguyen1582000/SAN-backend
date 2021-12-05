const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};

module.exports = {
  authenticate,
};
