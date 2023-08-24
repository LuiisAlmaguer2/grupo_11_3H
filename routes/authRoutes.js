const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const multer = require("multer");

const upload = multer();
const { body } = require("express-validator")


//Middlewares
const validations = [
    body('email').notEmpty().withMessage("Tienes que escribir un correo electronico").bail()
        .isEmail().withMessage("Tienes que escribir un formato de correo valido"),
    body('password').notEmpty().withMessage("Tienes que escribir tu contrasena"),
    body('nombre').notEmpty().withMessage("Tienes que escribir tu nombre"),
    body('apellido').notEmpty().withMessage("Tienes que escribir tu apellido"),
]
const guestMiddleware = require("../middlewares/guestMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")



// Formulario de registro
router.get("/register", guestMiddleware, authController.register);

// Procesamiento del registro
router.post("/register", upload.none(), validations, authController.save)

// Formulario de login
router.get("/login", guestMiddleware, authController.login)

// Procesamiento del login
router.post("/login", authController.loginProcess)

// Perfil de Usuario
router.get("/perfil", authMiddleware, authController.userProfile)

//Log out
router.get('/logout', authController.logout)

module.exports = router;