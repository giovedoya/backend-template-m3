const router = require("express").Router();
const Dress = require("../models/Dress");
const { isAuthenticated } = require("../middlewares/jwt");
const validateDress = require("../utils");
const fileUploader = require("../config/cloudinary.config");

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

// @desc    Get search dress
// @route   GET /dress/search
// @access  Public
router.get("/search", async (req, res, next) => {
  console.log('ruta')
  const { size, court, neckline, long } = req.query;

  try {  
    if (!size && !court && !neckline && !long) { // asegurarse de que al menos un parámetro de búsqueda se haya proporcionado
      return res.status(400).json({ message: "Por favor, proporcione al menos un parámetro de búsqueda" });
    }
    const dress = await Dress.find({
      size: new RegExp(size, 'i'),
      court: new RegExp(court, 'i'),
      neckline: new RegExp(neckline, 'i'),
      long: new RegExp(long, 'i')
    }).populate("seller");
    res.status(200).json(dress)
  } catch (error) {
    next(error);
    console.error(error);
  }
});



// @desc    Upload image
// @route   POST /upload
// @access  Private
router.post("/upload", isAuthenticated,fileUploader.single("imageUrl"), (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    res.json({ fileUrl: req.file.path });
  }
);

// @desc    Create dress
// @route   POST /dress
// @access  Private
router.post("/", isAuthenticated, async (req, res, next) => {
  const {
    neckline,
    court,
    long,
    color,
    size,
    designer,
    name,
    description,
    price,
    location,
    image,
  } = req.body;
  const dressIsValid = validateDress(req.body);
  console.log(dressIsValid);
  if (dressIsValid.isValid === false) {
    res.status(400).json({ message: "Please check your fields" });
  } else {
    const seller = req.payload._id;
    try {
      const newDress = await Dress.create({
        neckline,
        court,
        long,
        color,
        size,
        designer,
        name,
        description,
        price,
        location,
        image,
        seller: seller,
      }).populate("seller");
      res.status(201).json(newDress);
    } catch (error) {
      next(error);
    }
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
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this dress" });
    }
    await Dress.findByIdAndDelete(dressId);
    res
      .status(204)
      .json({ message: "the dress has been removed successfully" });
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
  const {
    neckline,
    court,
    long,
    color,
    size,
    designer,
    name,
    description,
    price,
    location,
    image,
  } = req.body;

  const validation = validateDress(req.body);
  if (!validation.isValid) {
    res
      .status(400)
      .json({
        message: "Please check your fields",
        missingFields: validation.missingFields,
      });
  } else {
    try {
      const editedDress = await Dress.findOneAndUpdate(
        { _id: dressId, seller },
        {
          neckline,
          court,
          long,
          color,
          size,
          designer,
          name,
          description,
          price,
          location,
          image,
        },
        { new: true }
      ).populate("seller");

      if (!editedDress) {
        return res.status(404).json({ message: "Dress not found" });
      }
      res.status(200).json(editedDress);
    } catch (error) {
      console.error("Error in updating dress:", error);
      res.status(500).json({ message: "Internal server error" });
      next(error);
    }
  }
});

module.exports = router;
