const router = require("express").Router();
const Review = require('../models/Review');
const User = require('../models/User');

// @desc    Get all reviews
// @route   GET /reviews
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate('buyerId', 'username');
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

// @desc    Get one review
// @route   GET /reviews/:id
// @access  Public
router.get('/:reviewId', async (req, res, next) => {
    const { reviewId } = req.params;
    try {
      const review = await Review.findById(reviewId).populate('buyerId', 'username');
      res.status(200).json(review);
    } catch (error) {
      next(error)
    }
  });


// @desc    Create review for a product
// @route   POST /products/:productId/reviews
// @access  Private
router.post('/:productId/reviews', async (req, res, next) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;
  const buyerId = req.user._id; // req.payload._id
  try {
    const newReview = await Review.create({ buyerId, productId, rating, comment });
    const updatedProduct = await Product.findByIdAndUpdate(productId, { $push: { reviews: newReview._id } }, { new: true });
    res.status(201).json(newReview);
  } catch (error) {
    next(error)
  }
});



// @desc    Edit a review for a product
// @route   PUT /products/:productId/reviews/:reviewId
// @access  Private
router.put('/:productId/reviews/:reviewId', async (req, res, next) => {
  const { productId, reviewId } = req.params;
  const { rating, comment } = req.body;
  const buyerId = req.user._id;

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
});


// @desc    Delete a review
// @route   DELETE /reviews/:reviewId
// @access  Private
router.delete('/:reviewId', async (req, res, next) => {
  const { reviewId } = req.params;
  const userId = req.user._id;
  try {
    const deletedReview = await Review.findOneAndDelete({ _id: reviewId, buyerId: userId });
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error)
  }
});




module.exports = router;
