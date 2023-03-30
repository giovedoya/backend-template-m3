const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema( // DRESSSCHEMA
  {
    category: {
      type: String,
      enum: ["shoe", "dress", "accessory", "veil", "jewelry", "other"],
      required: true
    },
    // ADD SIZE
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
    price: { // MIN PRICE
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
