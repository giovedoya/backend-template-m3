const router = require("express").Router();
const Product = require('../models/Product')


// @desc    Get all shows
// @route   GET /shows
// @access  Public
router.get("/", async (req, res, next) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
  
    }
  });


// @desc    Get one show
// @route   GET /show/:id
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

  
// @desc    Create show
// @route   POST /shows
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error)
  }
});

// @desc    Edit one show
// @route   PUT /shows/:showId
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

// @desc    Delete one show
// @route   DELETE /shows/:showId
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