const express = require("express")
const router = express.Router()
const path = require("path")
const adminUserController = require(path.resolve(__dirname, "../controllers/adminUserControllers"))
const multer = require("multer")
const adminMiddleware = require("../middlewares/adminMiddleware");

const upload = multer()

router.get("/", adminMiddleware, adminUserController.index)
router.get("/edit/:id", adminMiddleware, adminUserController.edit)
router.put("/edit/:id", upload.none(), adminUserController.update)

module.exports = router;