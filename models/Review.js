const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new mongoose.Schema({
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

module.exports = model('Review', reviewSchema);