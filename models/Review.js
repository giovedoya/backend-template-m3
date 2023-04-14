const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    buyerId: { 
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    dressId: {
      type: Schema.Types.ObjectId,
      ref: "Dress",
      required: true
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
