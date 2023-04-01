const router = require("express").Router();
const BlogPost = require('../models/BlogPost');
const { isAdmin } = require("../middlewares/jwt");

// @desc    Get all post
// @route   GET /post
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const posts = await BlogPost.find()
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

// @desc    Get one post
// @route   GET /post/:posId
// @access  Public
router.get("/:posId", async (req, res, next) => {
  const { posId } = req.params;
  try {
    const post = await BlogPost.findById(posId)
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

// @desc    Create post
// @route   POST /post
// @access  Private
router.post('/', async (req, res, next) => {
    console.log('ruta encontrada')
    const { title, content, author, image, createdAt } = req.body
        try {
          const newPost = await BlogPost.create({ title, content, author, image, createdAt });
          res.status(201).json(newPost);
        } catch (error) {
          next(error)
          console.error(error)
        }
      });

// @desc    Edit a review for a dress
// @route   PUT /reviews/:reviewId
// @access  Private
router.put("/:posId",  async (req, res, next) => {
    console.log('ruta encontrada')
    const { posId } = req.params;
  
    // const { rating, comment, } = req.body;
    // if (!rating || !comment) {
    //   return res.status(400).json({ message: "Please provide a rating and comment" });
    // }
    try {
      const updatedPost = await BlogPost.findByIdAndUpdate(posId, req.body, { new: true })
      if (!updatedPost) {
        return res.status(404).json({ message: "Posst not found" });
      };
      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Delete a review
// @route   DELETE /reviews/:reviewId
// @access  Private
// router.delete("/:reviewId", isAdmin, async (req, res, next) => {
//   const { reviewId } = req.params;
//   const buyerId = req.payload._id;
//   try {
//     const deletedReview = await Review.findById(reviewId);
//     if (deletedReview.buyerId.toString() !== buyerId) {
//       return res.status(404).json({ message: "You are not authorized to delete it"});
//     }
//     await Review.findByIdAndDelete(reviewId);   
//     res.status(204).json({ message: "the review has been removed successfully" });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
