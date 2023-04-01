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
router.get("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await BlogPost.findById(postId)
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

// @desc    Create post
// @route   POST /post
// @access  Private
router.post('/',  async (req, res, next) => {
    // const admin = req.payload;
    const { title, content, author, image, createdAt } = req.body
    // if (!req.payload.isAdmin) {
    //     return res.status(401).json({ message: "Unauthorized" });
    //   }
    if (!title || !content || !author || !image || !createdAt) {
        return res.status(400).json({ message: "please fill in all the fields" });
      }
        try {
          const newPost = await BlogPost.create({ title, content, author, image, createdAt });
          res.status(201).json(newPost);
        } catch (error) {
          next(error)
        }
      });

// @desc    Edit a post 
// @route   PUT /post/:posId
// @access  Private
router.put("/:postId",  async (req, res, next) => {
    const { postId } = req.params;
  
    // const { rating, comment, } = req.body;
    // if (!rating || !comment) {
    //   return res.status(400).json({ message: "Please provide a rating and comment" });
    // }
    try {
      const updatedPost = await BlogPost.findByIdAndUpdate(postId, req.body, { new: true })
      if (!updatedPost) {
        return res.status(404).json({ message: "Posst not found" });
      };
      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Delete a post
// @route   DELETE /post/:posId
// @access  Private
router.delete("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  try {
     await BlogPost.findById(postId);
    // if (deletedReview.buyerId.toString() !== buyerId) {
    //   return res.status(404).json({ message: "You are not authorized to delete it"});
    // }
    await BlogPost.findByIdAndDelete(postId);   
    res.status(204).json({ message: "the post has been removed successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
