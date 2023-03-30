const router = require("express").Router();
const Product = require("../models/Product");
const User = require("../models/User")
// const jwt = require("jsonwebtoken");
const { isAuthenticated, isAdmin } = require('../middlewares/jwt');

// @desc    Get all products
// @route   GET /products
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find().populate("seller", 'username');
    console.log( products);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// @desc    Get one product
// @route   GET /product/:id
// @access  Public
router.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId).populate("seller", 'username');
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

// @desc    Create product
// @route   POST /product
// @access  Private
router.post("/", isAuthenticated, async (req, res, next) => {
  const { category, designer, name, description, price, location, image } =
    req.body;
const seller = req.payload._id;
  try {
    const newProduct = await Product.create({
      category,
      designer,
      name,
      description,
      price,
      location,
      image,
      seller: seller
    });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// @desc    Delete one product
// @route   DELETE /product/:productId
// @access  Private
router.delete("/:productId", isAuthenticated, async (req, res, next) => {
  const { productId } = req.params;
  const seller = req.payload._id;
  try {
    const deletedProduct = await Product.findByIdAndDelete({
      _id: productId,
      seller,
    });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// @desc    Edit one product
// @route   PUT /product/:productId
// @access  Private
router.put("/:productId", isAuthenticated, async (req, res, next) => {
  const { productId } = req.params;
  const seller = req.payload._id;
  try {
    const editedProduct = await Product.findByIdAndUpdate(
      { _id: productId, seller },
      req.body,
      { new: true }
    );
    if (!editedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(editedProduct);
  } catch (error) {
    next(error);
  }
});


router.post('/:productId/reviews', isAuthenticated, async (req, res, next) => {
  console.log('encontrada')
  const { productId } = req.params;
  const { rating, comment } = req.body;
  const buyerId = req.payload._id;  
    try {
    const newReview = await Review.create({ productId, rating, comment, buyerId });
    res.status(201).json(newReview);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
