const Sales = require("../models/sales");
const soldStock = require("../controller/soldStock");

// Add Sales
const addSales = (req, res) => {
  const addSale = new Sales({
    productName: req.body.productName,
    orderNumber: req.body.orderNumber,
    barcode: req.body.barcode,
    dateRequired: req.body.dateRequired,
    dateCompleted: req.body.dateCompleted
  });

  addSale
    .save()
    .then((result) => {
      soldStock(req.body.productID, req.body.stockSold);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};


// Get All Sales Data
const getSalesData = async (req, res) => {
  try {
    const sales = await Sales.find();
    res.json(sales);
  } catch (error) {
    console.log(error);
    res.status(402).send("Error");
  }
};

// Get total sales amount
const getTotalSalesAmount = async(req,res) => {
  let totalSaleAmount = 0;
  const salesData = await Sales.find({"userID": req.params.userID});
  salesData.forEach((sale)=>{
    totalSaleAmount += sale.TotalSaleAmount;
  })
  res.json({totalSaleAmount});

}

const getMonthlySales = async (req, res) => {
  try {
    const sales = await Sales.find();

    // Initialize array with 12 zeros
    const salesAmount = [];
    salesAmount.length = 12;
    salesAmount.fill(0)

    sales.forEach((sale) => {
      const monthIndex = parseInt(sale.SaleDate.split("-")[1]) - 1;

      salesAmount[monthIndex] += sale.TotalSaleAmount;
    });

    res.status(200).json({ salesAmount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};



module.exports = { addSales, getMonthlySales, getSalesData,  getTotalSalesAmount};
