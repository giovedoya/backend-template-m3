const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const dressSchema = new Schema(
  {
    Neckline: {
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
    Court: {
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
    Long: {
      type: String,
      enum: ["Long", "Half", "Short"],
    },
    Color: {
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
    Size: {
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
    Designer: {
      type: String,
      required: true,
    },
    Seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    Name: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      min: 500,
      required: true,
    },
    Location: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
      required: true,
    },
    Sold: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Dress", dressSchema);
