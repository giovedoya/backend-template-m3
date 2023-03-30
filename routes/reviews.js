const router = require("express").Router();
const Review = require("../models/Review");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const { isAuthenticated, isAdmin } = require("../middlewares/jwt");

// @desc    Get all reviews
// @route   GET /reviews
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.find().populate("buyerId", "username");
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

// @desc    Get one review
// @route   GET /reviews/:id
// @access  Public
router.get("/:reviewId", async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const review = await Review.findById(reviewId).populate(
      "buyerId",
      "username"
    );
    console.log(review);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});

// @desc    Create review for a product
// @route   POST /reviews/:productId
// @access  Private
router.post("/:productId", isAuthenticated, async (req, res, next) => {
  const { productId } = req.params;
  const buyerId = req.payload._id;
  const { rating, comment } = req.body;
  try {
    const newReview = await Review.create({
      productId: productId,
      rating,
      comment,
      buyerId: buyerId,
    });
     res.status(201).json(newReview);
  } catch (error) {
    next(error);
    console.error(error);
  }
});

// @desc    Edit a review for a product
// @route   PUT /reviews/:reviewId
// @access  Private
router.put(  "/:reviewId", isAuthenticated, async (req, res, next) => {
    console.log("ruta encontrada");
    const { productId, reviewId } = req.params;
    const { rating, comment } = req.body;
    const buyerId = req.payload._id;

    try {
      const updatedReview = await Review.findOneAndUpdate(
        { _id: reviewId, buyerId, productId },
        { rating, comment },
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
    const deletedReview = await Review.findOneAndDelete({
      _id: reviewId, 
      buyerId,
    });    
    if (!deletedReview) {
      return res
        .status(404)
        .json({
          message: "Review not found or you are not authorized to delete it",
        });
    }   
    res.status(204).end();
  } catch (error) {
    next(error);
    console.error(error);
  }
});

module.exports = router;
