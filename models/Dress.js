const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const dressSchema = new Schema(
  {
    neckline: {
      type: String,
      enum: [
      "ship",
      "v-shaped",
      "square",
      "strapless",
      "halter",
      "round",
      "heart",
      "delusion",
      "fallen shoulders",
      "queen anne",
      "asymmetric",
      "others",
      ],
    },
    court: {
      type: String,
      enum: [
        "princess",
        "ptraight",
        "evaded",
        "in A",
        "siren",
        "empire",
        "others",
      ],
    },
    long: {
      type: String,
      enum: ["long", "half", "short"],
    },
    color: {
      type: String,
      enum: [
        "black",
        "light Blue",
        "brown",
        "golden",
        "grey",
        "green",
        "ivory",
        "multicolored",
        "pink",
        "red",
        "silver",
        "white",
        "dark blue",
        "others",
      ],
    },
    size: {
      type: String,
      enum: [
        "32",
        "34",
        "36",
        "38",
        "40",
        "42",
        "44",
        "46",
        "48",
        "50",
        "52",
        "54",
        "56",
        "58",
        "60",
        "62",
      ],
    },
    designer: {
      type: String,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 500,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: 'https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg'
    },
    sold: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Dress", dressSchema);



