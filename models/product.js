const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000
    },
    image: {
      data: Buffer,
      contentType: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
