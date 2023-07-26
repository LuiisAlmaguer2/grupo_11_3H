const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const mainController = require("../controllers/mainControllers");

router.get("/", mainController.index)

module.exports = router;