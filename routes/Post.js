const router = require("express").Router();
const BlogPost = require("../models/BlogPost");
const { isAdmin } = require("../middlewares/jwt");
const fileUploader = require("../config/cloudinary.config");

const { isAuthenticated } = require("../middlewares/jwt");
// @desc    Get all post
// @route   GET /post
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const posts = await BlogPost.find();
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
    const post = await BlogPost.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

// @desc    Upload image
// @route   POST /upload
// @access  Private
router.post(
  "/upload",
  isAuthenticated,
  fileUploader.single("imageUrl"),
  (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    res.json({ fileUrl: req.file.path });
  }
);

// @desc    Create post
// @route   POST /post
// @access  Private
router.post("/", isAuthenticated, isAdmin, async (req, res, next) => {
  const { title, content, author, image } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ message: "please fill in all the fields" });
  }
  try {
    const newPost = await BlogPost.create({ title, content, author, image });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});

// @desc    Edit a post
// @route   PUT /post/:posId
// @access  Private
router.put("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  const { title, content, author, image } = req.body;
  if (!title || !content || !author || !image) {
    return res.status(400).json({ message: "please fill in all the fields" });
  }
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      postId,
      { title, content, author, image },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a post
// @route   DELETE /post/:posId
// @access  Private
router.delete("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  try {
    await BlogPost.findById(postId);
    await BlogPost.findByIdAndDelete(postId);
    res.status(204).json({ message: "the post has been removed successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
