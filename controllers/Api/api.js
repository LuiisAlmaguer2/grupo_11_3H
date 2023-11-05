const db = require("../../database/models")
const { validationResult } = require("express-validator")

const controller = {
    indexProducts: (req, res) => {
        db.Product.findAll({
            include: db.Category
        })
            .then((productos) => {

                let mujer = 0
                let hombre = 0
                let accesorios = 0
                for (let index = 0; index < productos.length; index++) {
                    if (productos[index].category_id == 1) {
                        mujer++
                    } else if (productos[index].category_id == 2) {
                        hombre++
                    } else if (productos[index].category_id == 3) {
                        accesorios++
                    }

                }

                const respuesta = {
                    count: productos.length,
                    countByCategory: {
                        Mujer: mujer,
                        Hombre: hombre,
                        Accesorios: accesorios
                    },
                    products: productos
                }
                return res.json(respuesta)
            })
    },

    showProducts: (req, res) => {

        db.Product.findByPk(req.params.id, {
            include: db.Category
        })
            .then(producto => {
                res.json(producto)
            })
    },

    indexUsers: (req, res) => {
        db.User.findAll({ attributes: ["id", "name", "last_name", "email"] })
            .then((usuarios) => {

                const respuesta = {
                    count: usuarios.length,
                    data: usuarios
                }

                return res.json(respuesta)
            })

    },

    showUsers: (req, res) => {
        db.User.findByPk(req.params.id, {
            include: db.Role
        })
            .then(usuario => {
                res.json(usuario)
            })
    }
}

module.exports = controller;