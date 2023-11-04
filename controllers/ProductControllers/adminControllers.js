const path = require("path");
const fs = require("fs");
const db = require("../../database/models")
const { validationResult } = require("express-validator")

const controller = {
    index: (req, res) => {

        db.Product.findAll()
            .then((productos) => res.render("./admin/adminProducts", { productos }))


    },
    create: (req, res) => {

        db.Category.findAll()
            .then((categories) => {
                res.render("./admin/createProducts", { categories })
            })

    },
    save: (req, res) => {

        let resultValidation = validationResult(req)


        if (resultValidation.errors.length > 0) {
            db.Category.findAll()
                .then((categories) => {
                    console.log(resultValidation.errors)
                    res.render("./admin/createProducts", { categories, errors: resultValidation.mapped(), oldData: req.body })
                })
        } else {
            db.Product.create({
                name: req.body.nombre,
                description: req.body.descripcion,
                image: req.file.filename,
                category_id: req.body.categoria,
                color: req.body.color,
                price: req.body.precio
            })
                .then(() => {
                    res.redirect("/admin")
                })
        }




    },

    show: (req, res) => {

        db.Product.findByPk(req.params.id, {
            include: db.Category
        })
            .then(producto => {
                res.render("productDetail", { producto })
            })

    },

    edit: (req, res) => {

        let productoAEditar = db.Product.findByPk(req.params.id);
        let categorias = db.Category.findAll();

        Promise.all([productoAEditar, categorias])
            .then(([producto, categoria]) => {
                res.render("./admin/editProduct", { producto, categoria })
            })
    },

    update: (req, res) => {

        db.Product.findByPk(req.params.id)
            .then((productoEditado) => {
                db.Product.update({
                    name: req.body.nombre,
                    description: req.body.descripcion,
                    image: req.file ? req.file.filename : productoEditado.image,
                    category_id: req.body.categoria,
                    color: req.body.color,
                    price: req.body.precio
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                    .then(() => {
                        if (req.file?.filename) {
                            fs.unlinkSync(path.resolve(__dirname, "../../public/img/" + productoEditado.image))
                        }
                        res.redirect("/admin")
                    })
            })


    }

    ,
    delete: (req, res) => {

        db.Product.findOne({
            where: { id: req.params.id }
        })
            .then((producto) => {
                fs.unlinkSync(path.resolve(__dirname, "../../public/img/" + producto.image))

                db.Product.destroy({
                    where: { id: req.params.id }
                })
                    .then(() => {
                        res.redirect("/admin")
                    })
            })


    }

}

module.exports = controller;