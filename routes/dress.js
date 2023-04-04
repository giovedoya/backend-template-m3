const router = require("express").Router();
const Dress = require("../models/Dress");
const { isAuthenticated } = require('../middlewares/jwt');
const validateDress = require("../utils");

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
  // utils function to validate that all fields in req.body have the proper value
  const { neckline, court, long, color, size, designer, name, description, price, location, image, sold } = req.body;

  const dressIsValid = validateDress(req.body);
console.log(dressIsValid)
  if (dressIsValid === false){
    res.status(400).json({message: "Please check your fields"});
  } else{
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
  }
});


// @desc    Get search dress
// @route   GET /dress/search
// @access  Public
router.get("/search", async (req, res, next) => {
  console.log('ruta encontrada')
  try {
    const { neckline, court, size, long } = req.query;
    const dresses = await Dress.find({ neckline, court, size, long }).populate("seller");
    res.status(200).json(dresses);
  } catch (error) {
    next(error);
    console.error(error)
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
  const { neckline, court, long, color, size, designer, name, description, price, location, image, sold } = req.body;

  const dressIsValid = validateDress(req.body);
 
  if (dressIsValid === false){
    res.status(400).json({message: "Please check your fields"});
  } else{
  try {
    const editedDress = await Dress.findByIdAndUpdate(
      { _id: dressId, seller }, 
      { neckline, court, long, color, size, designer, name, description, price, location, image, sold },
      { new: true }
    );
    console.log(' sadsdasddds', editedDress)
    if (!editedDress) {
      return res.status(404).json({ message: "Dress not found" });
    }
    res.status(200).json(editedDress).populate('seller');
  } catch (error) {
    next(error);
  }
}
});

module.exports = router;
