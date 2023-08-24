const path = require("path");
const fs = require("fs");

const controller = {
    productCart: (req, res) => {
        return res.render("productCart");
    },

    productDetail: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/products.json")));
        let elProducto;

        productos.forEach(producto => {
            if (producto.id == req.params.id) {
                elProducto = producto
            }
        });

        res.render("productDetail", { elProducto })

    },

    showCategory: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/products.json")));
        let productosFilter;

        if (req.query.category === undefined) {
            productosFilter = productos

        } else {
            productosFilter = productos.filter(producto => producto.categoria === req.query.category);
        }

        //console.log(req.query)

        res.render("products", { productosFilter })
    },

    search: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/products.json")));

        let finalProductos = productos.filter(producto => producto.nombre.toUpperCase().includes(req.query.search.toUpperCase()));

        res.render("productsSearch", { finalProductos })
    }
}

module.exports = controller;