const router = require('express').Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Profile user
// @route   GET /profile
// @access  Private
router.get('/', isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const userDB = await User.findById(userId);
    res.status(200).json({
      user: {
        username: userDB.username,
        email: userDB.email,
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Edit profile
// @route   PUT /profile
// @access  Private
router.put('/', isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  const { username, email, password } = req.body;
  try {
    const userDB = await User.findById(userId);
    userDB.username = username || userDB.username;
    userDB.email = email || userDB.email;
    if (password) {
      userDB.password = password;
    }
    await userDB.save();
    res.status(200).json({
      user: {
        username: userDB.username,
        email: userDB.email,
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
