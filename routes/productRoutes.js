const express = require("express");
const router = express.Router();

const mainController = require("../controllers/productControllers");

router.get("/cart", mainController.productCart)

router.get("/detail", mainController.productDetail)

router.get("/", mainController.showWomen)



module.exports = router;