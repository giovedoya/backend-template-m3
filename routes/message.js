const router = require("express").Router();
const Message = require("../models/Message");
const { isAuthenticated } = require("../middlewares/jwt");


// @desc    Get all message
// @route   GET /message
// @access  Private
router.get("/", async (req, res, next) => {
    const userId = req.payload._id;
    try {
      const messages = await Message.find({ sender: userId });
      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  });



module.exports = router;