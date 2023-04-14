const router = require("express").Router();
const Message = require("../models/Message");
const Dress = require('../models/Dress')
const { isAuthenticated } = require("../middlewares/jwt");


// @desc    Get all message
// @route   GET /message
// @access  Private
router.get("/", async (req, res, next) => {
    try {
      const messages = await Message.find().populate("sender");
      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  });

  // @desc    Get one review
// @route   GET /reviews/:reviewId
// @access  Public
router.get("/:messageId", async (req, res, next) => {
  const { messageId } = req.params;
  try {
    const message = await Message.findById(messageId).populate(
      "sender",
      "receiver"
    );
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
});


// @desc    Create dress
// @route   POST /dress
// @access  Private
router.post("/:dressId", isAuthenticated, async (req, res, next) => {
    const {
      subject,
      message,
      phone,
    } = req.body;
    const { dressId } = req.params;  
    const receiver = req.payload._id;
    try {
      const newMessage = await Message.create({
        subject,
        message,
        phone,
        sender: receiver,  
        receiver: dressId,  
      });
      res.status(201).json(newMessage);
    } catch (error) {
      next(error);
    }
  });
  
  

module.exports = router;