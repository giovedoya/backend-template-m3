const router = require('express').Router();
const User = require('../models/User');
const Dress = require('../models/Dress')
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Profile user
// @route   GET /profile
// @access  Private
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const userDB = await User.find();
    res.status(200).json(userDB);
  } catch (error) {
    next(error);
  }
});

// @desc    Get one user
// @route   GET /user/:userId
// @access  Public
router.get("/:userId", async (req, res, next) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });
  


  // @desc    Get user dresses
  // @route   GET /profile/user/dresses
  // @access  Private
  router.get("/user/dresses", isAuthenticated, async (req, res) => {
    try {
      const user = await User.findById(req.payload.id);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }  
      const dresses = await Dress.find({ seller: user._id });
      return res.status(200).json(dresses);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });



// @desc    Edit profile
// @route   PUT /profile
// @access  Private
router.put('/', isAuthenticated, async (req, res, next) => {
    const { _id: userId } = req.payload;
    const { username, email } = req.body;
  
    if (!username || !email) {
      return res.status(400).json({ error: "Please fill all the fields in order to update your profile." });
    }
  
    const allowedFields = { username, email }; 
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, allowedFields, { new: true });
      return res.status(200).json({ user: { username: updatedUser.username, email: updatedUser.email } });
    } catch (error) {
      return next(error);
    }
  });
  

module.exports = router;
