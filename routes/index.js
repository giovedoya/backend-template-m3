const router = require("express").Router();

// @desc    Index page for the API
// @route   GET /
// @access  Public
router.get("/", async (req, res, next) => {
  res.status(200).json({ message: "Connected" });
});

module.exports = router;
