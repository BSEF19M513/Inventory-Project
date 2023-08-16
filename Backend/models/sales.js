const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
  {
    /*
    productName: "",
    orderNumber: "",
    barcode: "",
    dateRequired: "",
    dateCompleted: "",
    create the schema for sales with these fields
     */
    productName: {
      type: String,
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
    },
    barcode: {
      type: String,
      required: true,
    },
    dateRequired: {
      type: String,
      required: true,
    },
    dateCompleted: {
      type: String,
      required: true,
    }
  }
);

const Sales = mongoose.model("sales", SaleSchema);
module.exports = Sales;
