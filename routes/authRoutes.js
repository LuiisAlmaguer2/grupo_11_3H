const express = require("express");
const router = express.Router();
const mainController = require("../controllers/authControllers");
const multer = require("multer");

const upload = multer();



router.get("/login", mainController.login)

router.get("/register", mainController.register);
router.post("/register", upload.none(), mainController.save)

module.exports = router;