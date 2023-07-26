const path = require("path");
const fs = require("fs");

const controller = {
    index: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/products.json")));

        res.render("index", { productos });
    }
}

module.exports = controller;