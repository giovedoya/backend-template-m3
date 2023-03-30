const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new mongoose.Schema(
  {
    buyerId: { // REQUIRED
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    productId: {// REQUIRED
      type: Schema.Types.ObjectId,
      ref: "Product"
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

module.exports = model("Review", reviewSchema);
