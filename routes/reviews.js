const router = require("express").Router();
const Review = require("../models/Review");
const { isAuthenticated } = require("../middlewares/jwt");

// @desc    Get all reviews
// @route   GET /reviews
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.find().populate("buyerId", "dressId");
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

// @desc    Get logged in user's dresses
// @route   GET /dresses
// @access  Private
router.get("/review", isAuthenticated, async (req, res, next) => {
  try {
    const { _id: userId } = req.payload;
    const reviews = await Review.find({ buyerId: userId });
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});


// @desc    Get all reviews for a specific dress
// @route   GET /reviews/dress/:dressId
// @access  Public
router.get("/:dressId", async (req, res, next) => {
  try {
    const { dressId } = req.params;
    console.log("dressId:", dressId); // Debug log
    const reviews = await Review.find({ productId: dressId });
    console.log("reviews:", reviews); // Debug log
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error:", error); // Debug log
    next(error);
  }
});




// @desc    Get one review
// @route   GET /reviews/:reviewId
// @access  Public
router.get("/:reviewId", async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const review = await Review.findById(reviewId).populate(
      "buyerId",
      "dressId"
    );
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});

// @desc    Create review for a dress
// @route   POST /reviews/:dressId
// @access  Private
router.post("/:dressId", isAuthenticated, async (req, res, next) => {
  const { dressId } = req.params;
  const buyerId = req.payload._id;
  const { rating, comment } = req.body;
  if (!rating || !comment) {
    return res.status(400).json({ message: "Please provide a rating and comment" });
  }
  try {
    const newReview = await Review.create({
      dressId: dressId,
      rating,
      comment,
      buyerId: buyerId,
    })
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

// @desc    Edit a review for a dress
// @route   PUT /reviews/:reviewId
// @access  Private
router.put("/:reviewId", isAuthenticated, async (req, res, next) => {
  console.log('encontreada')
    const { reviewId } = req.params;
    const buyerId = req.payload._id;
    const { rating, comment, } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ message: "Please provide a rating and comment" });
    }
    try {
      const updatedReview = await Review.findByIdAndUpdate(
        { _id: reviewId, buyerId },
        req.body,
        { new: true }
      );
      if (!updatedReview) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.status(200).json(updatedReview);
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Delete a review
// @route   DELETE /reviews/:reviewId
// @access  Private
router.delete("/:reviewId", isAuthenticated, async (req, res, next) => {
  const { reviewId } = req.params;
  const buyerId = req.payload._id;
  try {
    const deletedReview = await Review.findById(reviewId);
    if (deletedReview.buyerId.toString() !== buyerId) {
      return res.status(404).json({ message: "You are not authorized to delete it"});
    }
    await Review.findByIdAndDelete(reviewId);   
    res.status(204).json({ message: "the review has been removed successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
