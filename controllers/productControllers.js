const path = require("path");
const fs = require("fs");

const controller = {
    productCart: (req, res) => {
        return res.render("productCart");
    },
    productDetail: (req, res) => {
        console.log(req.query)
        return res.render("productDetail");

    },
    showWomen: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/products.json")));

        let productosFilter = productos.filter(producto => producto.categoria === req.query.category);

        res.render("products", { productosFilter })
    }
}

module.exports = controller;