const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["shoe", "dress", "accessory", "veil", "jewelry", "other"],
      required: true
    },
    designer: {
      type: String,
      required: true
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    sold: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true
  }
);

module.exports = model("Product", productSchema);
