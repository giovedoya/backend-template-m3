const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const dressSchema = new Schema(
  {
    neckline: {
      type: String,
      enum: [
      "Ship",
      "V-shaped",
      "Square",
      "Strapless",
      "halter",
      "Round",
      "Heart",
      "Delusion",
      "Fallen shoulders",
      "Queen anne",
      "Asymmetric",
      "Others",
      ],
    },
    court: {
      type: String,
      enum: [
        "Princess",
        "Straight",
        "evaded",
        "in A",
        "Siren",
        "Empire",
        "Others",
      ],
    },
    long: {
      type: String,
      enum: ["Long", "Half", "Short"],
    },
    color: {
      type: String,
      enum: [
        "Black",
        "Light Blue",
        "Brown",
        "Golden",
        "Grey",
        "Green",
        "Ivory",
        "Multicolored",
        "Pink",
        "Red",
        "Silver",
        "White",
        "Dark blue",
        "Others",
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
