const router = require("express").Router();
const Product = require('../models/Product')


// @desc    Get all products
// @route   GET /products
// @access  Public
router.get("/", async (req, res, next) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
  
    }
  });


// @desc    Get one product
// @route   GET /product/:id
// @access  Public
router.get('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
      const products = await Product.findById(productId);
      res.status(200).json(products);
    } catch (error) {
      next(error)
    }
  });

  
// @desc    Create product
// @route   POST /product
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error)
  }
});

// @desc    DElete one product
// @route   DELETE /product/:productId
// @access  Public
router.delete('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    res.status(201).json(deletedProduct);
  } catch (error) {
    next(error)
  }
});

// @desc    edit one product
// @route   PUT /product/:productId
// @access  Public
router.put('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  try {
    const editedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    // console.log(editedProduct);
    res.status(204).json(editedProduct);
  } catch (error) {
    next(error)
  }
});



  module.exports = router;