const express = require("express");
const router = express.Router();

const mainController = require("../controllers/productControllers");

router.get("/cart", mainController.productCart)

router.get("/detail/:id", mainController.productDetail)

router.get("/", mainController.showCategory)


module.exports = router;