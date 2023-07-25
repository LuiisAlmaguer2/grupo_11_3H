const express = require("express");
const router = express.Router();
const path = require("path");
const controllersAdmin = require(path.resolve(__dirname, "../controllers/adminControllers"));
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/imagesServer'))
    },
    filename: function (req, file, cb) {
        cb(null, 'product-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

router.get("/", controllersAdmin.index);
router.get("/create", controllersAdmin.create);
router.post("/create", upload.single('imagen'), controllersAdmin.save);
router.get("/detail/:id", controllersAdmin.show);
//router.get("/edit/:id", controllersAdmin.edit)
//router.put()

router.get("/delete/:id", controllersAdmin.delete);

module.exports = router;