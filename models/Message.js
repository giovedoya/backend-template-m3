const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    subject: {
      type: String,
    //   required: true,
      trim: true
    },
    message: {
      type: String,
    //   required: true,
      trim: true
    },
    phone: {
        type: Number,
        // required: true,
        trim: true
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    //   required: true
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    //   required: true
    }
  },
  { timestamps: true }
);


module.exports = model('Message', messageSchema);
