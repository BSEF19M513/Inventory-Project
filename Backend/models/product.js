const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);


const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
