const express = require("express");
const { main } = require("./models/index");
const productRoute = require("./router/product");
const purchaseRoute = require("./router/purchase");
const salesRoute = require("./router/sales");
const cors = require("cors");
const User = require("./models/admin");
const Product = require("./models/product");
const Store = require("./models/store");
const bodyParser = require("body-parser")

const app = express();
const PORT = 4002;
main();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));




// Products API
app.use("/api/product", productRoute);

// Purchase API
app.use("/api/purchase", purchaseRoute);

// Sales API
app.use("/api/sales", salesRoute);

// ------------- Signin --------------
let userAuthCheck;
app.post("/api/login", async (req, res) => {
  console.log(req.body);
  // res.send("hi");
  try {
    const user = await User.findOne({
      email: req.body.email,
      adminId: req.body.adminId,
    });
    console.log("USER: ", user);
    if (user) {
      res.send(user);
      userAuthCheck = user;
    } else {
      res.status(401).send("Invalid Credentials");
      userAuthCheck = null;
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Getting User Details of login user
app.get("/api/login", (req, res) => {
  res.send(userAuthCheck);
});
// ------------------------------------

// Registration API
app.post("/api/register", (req, res) => {
  let registerUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    adminId: req.body.adminId,
    address: req.body.address,
  });

  registerUser
    .save()
    .then((result) => {
      res.status(200).send(result);
      console.log("result: ", result);
    })
    .catch((err) => console.log("Signup: ", err));
  console.log("request: ", req.body);
});

// Store API
app.get("/api/store", async (req, res) => {
  try {
    const store = await Store.find();
    res.send(store);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/store/add", async (req, res) => {
  const { sno, name, barcode } = req.body;

  // Check if the required fields are provided
  if (!sno || !name || !barcode) {
    return res.status(400).json({ success: false, message: "Please fill all fields" });
  }

  // Create a new store
  const store = new Store({
    sno: sno,
    name: name,
    barcode: barcode
  });

  try {
    await Store.collection.dropIndexes();
    // Save the store to the database
    const savedStore = await store.save();

    // Respond with the saved store data
    res.status(200).json({ success: true, data: savedStore });
  } catch (err) {
    console.error("Error saving the store:", err);

    // Check for duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "Duplicate field value entered" });
    }

    // For other errors, respond with a general server error message
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/testget", async (req, res) => {
  const result = await Product.findOne({ _id: '6429979b2e5434138eda1564' })
  res.json(result)

})

// Here we are listening to the server
app.listen(PORT, () => {
  console.log("I am live again");
});
