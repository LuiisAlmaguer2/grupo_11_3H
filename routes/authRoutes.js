const express = require("express");
const router = express.Router();

const mainController = require("../controllers/authControllers");

router.get("/login", mainController.login)

router.get("/register", mainController.register)

module.exports = router;