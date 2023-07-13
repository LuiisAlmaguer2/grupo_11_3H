const express = require("express");
const router = express.Router();

const mainController = require("../controllers/productControllers");

router.get("/cart", mainController.productCart)

router.get("/detail", mainController.productDetail)



module.exports = router;