const express = require("express");
const router = express.Router();
const path = require("path");
const apiController = require(path.resolve(__dirname, "../../controllers/Api/api"))

router.get("/products", apiController.indexProducts);
router.get("/products/:id", apiController.showProducts)
router.get("/users", apiController.indexUsers);
router.get("/users/:id", apiController.showUsers)


module.exports = router