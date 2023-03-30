const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    location: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

module.exports = model("User", userSchema);
