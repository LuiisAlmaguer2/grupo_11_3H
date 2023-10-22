const db = require("../../database/models")
const { validationResult } = require("express-validator")

const controller = {
    indexProducts: (req, res) => {
        db.Product.findAll()
            .then((productos) => {
                return res.json(productos)
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
        db.User.findAll()
            .then((usuarios) =>
                res.json(usuarios)
            )

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