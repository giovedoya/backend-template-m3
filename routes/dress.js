const router = require("express").Router();
const Dress = require("../models/Dress");
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Get all dress
// @route   GET /dress
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const dresses = await Dress.find().populate("seller");
    res.status(200).json(dresses);
  } catch (error) {
    next(error);
  }
});

// @desc    Get one dress
// @route   GET /dress/:dressId
// @access  Public
router.get("/:dressId", async (req, res, next) => {
  const { dressId } = req.params;
  try {
    const dress = await Dress.findById(dressId).populate("seller");
    res.status(200).json(dress);
  } catch (error) {
    next(error);
  }
});

// @desc    Create dress
// @route   POST /dress
// @access  Private
router.post("/", isAuthenticated, async (req, res, next) => {
  const { neckline, court, long, color, size, designer, name, description, price, location, image, sold } =
    req.body;
    const allowedProps = ["neckline", "court", "long", "color", "seller", "size", "designer", "name", "description", "price", "location", "image", "sold"];
    for (let prop in req.body) {
      if (!allowedProps.includes(prop)) {
        return res.status(400).json({ message: `Invalid property: ${prop}` });
      }
    }
    if (!["ship", "v-shaped", "square", "strapless", "halter", "round", "heart", "delusion", "fallen shoulders", "queen anne", "asymmetric", "others"].includes(neckline)) {
      return res.status(400).json({ message: "Invalid neckline value" });
}
    if (!["princess", "straight", "evaded", "in A", "siren", "empire", "others"].includes(court)) {
      return res.status(400).json({ message: "Invalid court value" });
}
    if (!["long", "half", "short",].includes(long)) {
      return res.status(400).json({ message: "Invalid long value" });
}
    if (!["black", "light blue", "brown", "golden", "grey", "green", "ivory", "multicolored", "pink", "red", "silver", "white", "dark blue", "others"].includes(color)) {
      return res.status(400).json({ message: "Invalid color value" });
}
    if (!["32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "62"].includes(size)) {
      return res.status(400).json({ message: "Invalid size value" });
}
const seller = req.payload._id;
  try {
    const newDress = await Dress.create({
      neckline, court, long, color, size, designer, name, description, price, location, image, sold,
      seller: seller
    });
    res.status(201).json(newDress).populate('seller');
  } catch (error) {
    next(error);
  }
});

// @desc    Delete one dress
// @route   DELETE /dress/:dressId
// @access  Private
router.delete("/:dressId", isAuthenticated, async (req, res, next) => {
  const { dressId } = req.params;
  const seller = req.payload._id;
  try {
    const deletedDress = await Dress.findById(dressId);
    if (deletedDress.seller.toString() !== seller) {
      return res.status(403).json({ message: "You are not allowed to delete this dress" });
    }
    await Dress.findByIdAndDelete(dressId);
    res.status(204).json({ message: "the dress has been removed successfully" });
  } catch (error) {
    next(error);
  }
});


// @desc    Edit one dress
// @route   PUT /dress/:dressId
// @access  Private
router.put("/:dressId", isAuthenticated, async (req, res, next) => {
  const { dressId } = req.params;
  const seller = req.payload._id;
  const { neckline, court, long, color, size, designer, name, description, price, location, image } = req.body;
  if (!neckline || !court || !long || !color || !size || !designer || !name || !description || !price || !location || !image ) {
    res.status(400).json({ message: 'Please fill all the fields to edit' });
    return;
  }
  try {
    const editedDress = await Dress.findByIdAndUpdate(
      { _id: dressId, seller }, 
      { neckline, court, long, color, size, designer, name, description, price, location, image },
      { new: true }
    );
    if (!editedDress) {
      return res.status(404).json({ message: "Dress not found" });
    }
    res.status(200).json(editedDress).populate('seller');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
