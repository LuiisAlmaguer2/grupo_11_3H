const path = require("path");
const fs = require("fs");
const db = require("../database/models")

const controller = {
    index: (req, res) => {

        db.Product.findAll()
            .then(productos => {
                res.render("index", { productos: productos });
            })
    }
}

module.exports = controller;