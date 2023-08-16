const Product = require("../models/product");
const Purchase = require("../models/purchase");
const Sales = require("../models/sales");

// Add Post
const addProduct = (req, res) => {
  console.log("req: ", req.body.userId);
  const addProduct = new Product({
    name: req.body.name,
    quantity: req.body.quantity
  });

  addProduct
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(402).send("Error");
  }
};

// Delete Selected Product
const deleteSelectedProduct = async (req, res) => {
  // find by name and delete it
  const deletedResult = await Product.findOneAndDelete({
    name: req.params.name,
  });
  // return result
  res.json(deletedResult);
};

// Update Selected Product
const updateSelectedProduct = async (req, res) => {

  // Get name and updated name from request body
  const { name, updatedName, quantity } = req.body;

  // Find product by name and update name and quantity
  const updatedResult = await Product.findOneAndUpdate(
    { name },
    { name: updatedName, quantity },
    { new: true }
  );

  // Return result
  res.json(updatedResult);

};
// Search Products
const searchProduct = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const products = await Product.find({
    name: { $regex: searchTerm, $options: "i" },
  });
  res.json(products);
};

module.exports = {
  addProduct,
  getAllProducts,
  deleteSelectedProduct,
  updateSelectedProduct,
  searchProduct,
};
