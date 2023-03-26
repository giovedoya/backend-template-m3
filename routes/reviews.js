const router = require("express").Router();
const Review = require('../models/Review')

// @desc    Get all reviews
// @route   GET /reviews
// @access  Public
router.get("/", async (req, res, next) => {
    try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
    } catch (error) {
      next(error)
    }
  });

// @desc    Get one review
// @route   GET /reviews/:id
// @access  Public
router.get('/:reviewId', async (req, res, next) => {
    const { reviewId } = req.params;
    try {
      const review = await Review.findById(reviewId);
      res.status(200).json(review);
    } catch (error) {
      next(error)
    }
  });

// @desc    Create review
// @route   POST /reviews
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    next(error)
  }
});

// @desc    Edit one review
// @route   PUT /reviews/:reviewId
// @access  Public
router.put('/:reviewId', async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const editedReview = await Review.findByIdAndUpdate(reviewId, req.body, { new: true });
    res.status(204).json(editedReview);
  } catch (error) {
    next(error)
  }
});

// @desc    Delete one review
// @route   DELETE /reviews/:reviewId
// @access  Public
router.delete('/:reviewId', async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    res.status(201).json(deletedReview);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
