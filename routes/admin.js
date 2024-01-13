const express = require("express");
const router = express.Router();
const path = require("path");

const adminController = require("../controllers/admin.js");

router.get(
  "/addproduct",
  adminController.getAddProduct
  //use method allow us to add a middleware function -
  // res.sendFile(
  //   '<body><form action="/admin/product" method="POST"><input type="text" name="message"><button type="submit"> Add product </button></body>'
  //   path.join(__dirname, "../", "views", "add-product.html") );

  // next(); //next method allow us to travel to next middleware
);
router.get("/products", adminController.getProducts);
router.post("/editproduct", adminController.postEditProduct);
router.get("/edit-product/:productId", adminController.getEditProduct);
router.post("/addproduct", adminController.postAddProduct);
router.post("/deleteproduct", adminController.postDeleteProduct);

exports.router = router;
