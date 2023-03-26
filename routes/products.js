const router = require("express").Router();
const Products = require('../models/Product')


// @desc    Get all shows
// @route   GET /shows
// @access  Public
router.get("/", async (req, res, next) => {
    try {
      const products = await Products.find();
      res.status(200).json(products);
    } catch (error) {
  
    }
  });


// @desc    Get one show
// @route   GET /show/:id
// @access  Public
router.get('/:advertisementsId', async (req, res, next) => {
    const { advertisementsId } = req.params;
    try {
      const advertisements = await Advertisement.findById(advertisementsId);
      res.status(200).json(advertisements);
    } catch (error) {
      next(error)
    }
  });

  module.exports = router;