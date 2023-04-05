const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogPostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    default:
      "https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg"
  },
});

module.exports = model("BlogPost", blogPostSchema);
