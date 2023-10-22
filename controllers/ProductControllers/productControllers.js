const path = require("path");
const fs = require("fs");
const db = require("../../database/models")
const { Op } = require("sequelize");

const controller = {
    productCart: (req, res) => {
        return res.render("productCart");
    },

    productDetail: (req, res) => {

        db.Product.findByPk(req.params.id, {
            include: db.Category
        })
            .then(producto => {
                res.render("productDetail", { producto })
            })

    },

    showCategory: (req, res) => {
        // let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/products.json")));
        // let productosFilter;

        // if (req.query.category === undefined) {
        //     productosFilter = productos

        // } else {
        //     productosFilter = productos.filter(producto => producto.categoria === req.query.category);
        // }

        // //console.log(req.query)

        // res.render("products", { productosFilter })

        db.Product.findAll({
            include: db.Category.name,
            where: { category_id: req.query.category }

        })
            .then(productos => {
                res.render("products", { productos })
            })
    },

    search: (req, res) => {

        db.Product.findAll({
            where: {
                name: {
                    [Op.like]: '%' + req.query.search + "%"
                }
            }
        }
        )

            .then(productos => {
                res.render("productsSearch", { productos })
            })
    }
}

module.exports = controller;