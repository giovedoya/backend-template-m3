const router = require("express").Router();
const Dress = require("../models/Dress");
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Get all products
// @route   GET /products
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const dresses = await Dress.find().populate("seller");
    res.status(200).json(dresses);
  } catch (error) {
    next(error);
  }
});

// @desc    Get one product
// @route   GET /product/:id
// @access  Public
router.get("/:dressId", async (req, res, next) => {
  const { dressId } = req.params;
  try {
    const dress = await Dress.findById(dressId).populate("seller"); // REMOVE USERNAME
    res.status(200).json(dress);
  } catch (error) {
    next(error);
  }
});

// @desc    Create product
// @route   POST /product
// @access  Private
router.post("/", isAuthenticated, async (req, res, next) => {
  const { neckline, court, long, color, size, designer, name, description, price, location, image, sold } =
    req.body;
    // CHECK THAT CATEGORY IS WITHIN THE ENUM. IF IT'S NOT, SET CATEGORY TO OTHER
    // CHECK THAT ALL BODY FIELDS EXPECTED ARE PRESENT. 
const seller = req.payload._id;
  try {
    const newDress = await Dress.create({
      neckline, court, long, color, size, designer, name, description, price, location, image, sold,
      seller: seller
    });
    res.status(201).json(newDress); // POPULATE SELLER
  } catch (error) {
    next(error);
  }
});

// @desc    Delete one product
// @route   DELETE /product/:productId
// @access  Private
router.delete("/:dressId", isAuthenticated, async (req, res, next) => {
  const { dressId } = req.params;
  const seller = req.payload._id;
  // CHECK THAT EVERY ROUTE THAT DELETES OR EDITS SOMETHING, THE USER IN SESSION IS THE OWNER OF THE THING TO DELETE/EDIT
  // IF IT'S NOT THE OWNER, ERROR
  try {
    const deletedDress = await Dress.findByIdAndDelete({
      _id: dressId,
      seller, // REMOVE SELLER
    });
    if (!deletedDress) {
      return res.status(404).json({ message: "Dress not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// @desc    Edit one product
// @route   PUT /product/:productId
// @access  Private
router.put("/:dressId", isAuthenticated, async (req, res, next) => {
  const { dressId } = req.params;
  const seller = req.payload._id;
  try {
    const editedDress = await Dress.findByIdAndUpdate(
      { _id: dressId, seller }, // WITHOUT SELLER
      req.body, // CHECK THAT FIELDS ARE NOT EMPTY
      { new: true }
    );
    if (!editedDress) {
      return res.status(404).json({ message: "Dress not found" });
    }
    res.status(200).json(editedDress); // POPULATE SELLER
  } catch (error) {
    next(error);
  }
});


module.exports = router;
