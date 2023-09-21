const path = require("path");
const fs = require("fs");
const db = require("../database/models")

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
        // let img;
        // let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/products.json")));
        // const id = parseInt(req.params.id)
        // let productoEditado = productos.find(producto => producto.id === id);

        // if (req.file && req.file.filename) {
        //     img = req.file.filename
        //     fs.unlinkSync(path.resolve(__dirname, "../public/img/" + productoEditado.imagen))
        // } else {
        //     img = productoEditado.imagen;
        // }

        // let productoUpdate = productos.map(producto => {
        //     if (producto.id === id) {
        //         return ({
        //             id: id,
        //             nombre: req.body.nombre,
        //             descripcion: req.body.descripcion,
        //             imagen: img,
        //             categoria: req.body.categoria,
        //             color: req.body.color,
        //             precio: req.body.precio
        //         })
        //     }
        //     return producto;
        // })

        // let productosActualizar = JSON.stringify(productoUpdate, null, 2);
        // console.log(productosActualizar);
        // fs.writeFileSync(path.resolve(__dirname, "../data/products.json"), productosActualizar);

        // res.redirect("/admin")

        db.Product.update({
            name: req.body.nombre,
            description: req.body.descripcion,
            image: req.file ? req.file.filename : db.Product.image,
            category_id: req.body.categoria,
            color: req.body.color,
            price: req.body.precio
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.redirect("/admin")
            })
    }

    ,
    delete: (req, res) => {

        db.Product.findOne({
            where: { id: req.params.id }
        })
            .then((producto) => {
                fs.unlinkSync(path.resolve(__dirname, "../public/img/" + producto.image))
            })

        db.Product.destroy({
            where: { id: req.params.id }
        })
            .then(() => {
                res.redirect("/admin")
            })
    }

}

module.exports = controller;