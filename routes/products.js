const router = require("express").Router();
const Product = require('../models/Product')


// @desc    Get all products
// @route   GET /products
// @access  Public
  router.get("/", async (req, res, next) => {
    try {
      const products = await Product.find().populate('seller', 'username email');
      res.status(200).json(products);
    } catch (error) {
      next(error)
    }
  });


// @desc    Get one product
// @route   GET /product/:id
// @access  Public
router.get('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
      const product = await Product.findById(productId).populate('seller', 'username email');
      res.status(200).json(product);
    } catch (error) {
      next(error)
    }
  });


  
// @desc    Create product
// @route   POST /product
// @access  Public
router.post('/', async (req, res, next) => {
  const { category, designer, name, description, price, location, image } = req.body;
  const seller = req.user._id;
  try {
    const newProduct = await Product.create({ category, designer, seller, name, description, price, location, image });
    const updatedUser = await User.findByIdAndUpdate(seller, { $push: { products: newProduct._id } }, { new: true });
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

router.delete('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  const seller = req.user._id;
  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: productId, seller });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(seller, { $pull: { products: deletedProduct._id } }, { new: true });
    res.status(204).end();
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

router.put('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  const seller = req.user._id;
  try {
    const editedProduct = await Product.findOneAndUpdate({ _id: productId, seller }, req.body, { new: true });
    if (!editedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(editedProduct);
  } catch (error) {
    next(error)
  }
});



  module.exports = router;