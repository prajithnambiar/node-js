const express = require("express");
const router = express.Router();
const path = require("path");

const shopController = require("../controllers/shop.js");

router.get("/", shopController.getIndex);
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct); //this is a dynamic route. Here we wrote :produxtId, this will help us to extract product id from the route
router.get("/checkout", shopController.getCheckout);
router.get("/orders", shopController.getOrders);

module.exports = router;
