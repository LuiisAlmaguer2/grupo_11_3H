const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const mainController = require("../../controllers/ProductControllers/mainControllers");
const productControllers = require("../../controllers/ProductControllers/productControllers");

router.get("/", mainController.index)
router.get("/searchPage", productControllers.search)

module.exports = router;