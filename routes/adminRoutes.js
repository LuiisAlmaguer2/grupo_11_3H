const express = require("express");
const router = express.Router();
const path = require("path");
const controllersAdmin = require(path.resolve(__dirname, "../controllers/adminControllers"));
const multer = require("multer");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { body } = require("express-validator")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/img'))
    },
    filename: function (req, file, cb) {
        cb(null, 'product-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

const validations = [
    body('nombre').notEmpty().withMessage("Tienes que agregar un nombre").bail()
        .isLength({ min: 5 }).withMessage("El nombre tiene que contener mas de 5 caracteres"),
    body("descripcion").notEmpty().withMessage("Tienes que agregar una descripcion").bail()
        .isLength({ min: 20 }).withMessage("La descripcion debe de contener mas de 20 caracteres"),
    body("imagen").custom((value, { req }) => {
        let file = req.file
        let extensions = [".jpg", ".jpeg", ".png", ".gif"]

        if (!file) {
            throw new Error("Tienes que subir una imagen")
        } else {
            let fileExtension = path.extname(file.originalname)
            if (!extensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${extensions.join(", ")}`)
            }
        }

        return true
    })
]



//Rutas para creacion, visualizacion, edicion y eliminacion de productos
router.get("/", adminMiddleware, controllersAdmin.index);
router.get("/create", adminMiddleware, controllersAdmin.create);
router.post("/create", upload.single('imagen'), validations, controllersAdmin.save); //poner las validaciones aqui
router.get("/detail/:id", adminMiddleware, controllersAdmin.show);
router.get("/edit/:id", adminMiddleware, controllersAdmin.edit)
router.put("/edit/:id", upload.single('imagen'), controllersAdmin.update) //poner las valdiaciones aqui
router.delete("/:id", controllersAdmin.delete);




module.exports = router;