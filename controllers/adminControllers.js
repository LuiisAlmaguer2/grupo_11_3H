const path = require("path");
const fs = require("fs");


const controller = {
    index: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/products.json")))

        res.render("./admin/adminProducts", { productos });
    },
    create: (req, res) => {
        res.render("./admin/createProducts")

    },
    save: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/products.json")));

        let ultimoProducto = productos.pop();
        productos.push(ultimoProducto);

        let nuevoProducto = {
            id: ultimoProducto.id + 1,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: req.file.filename,
            categoria: req.body.categoria,
            color: req.body.color,
            precio: req.body.precio
        }

        productos.push(nuevoProducto);

        let nuevaLista = JSON.stringify(productos, null, 2);

        fs.writeFileSync(path.resolve(__dirname, "../data/products.json"), nuevaLista)

        res.redirect("/admin")
    },

    show: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/products.json")));
        let elProducto;

        productos.forEach(producto => {
            if (producto.id == req.params.id) {
                elProducto = producto
            }
        });

        res.render("./admin/detailProduct", { elProducto })

    },

    delete: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/products.json")));

        let productoAEliminar = parseInt(req.params.id);

        let productoEliminado = productos.find(producto => producto.id === productoAEliminar);

        let productosFinales = productos.filter(producto => producto.id !== productoAEliminar);

        let productosAGuardar = JSON.stringify(productosFinales, null, 2);

        fs.writeFileSync(path.resolve(__dirname, "../data/products.json"), productosAGuardar);

        fs.unlinkSync(path.resolve(__dirname, "../public/imagesServer/" + productoEliminado.imagen))

        res.redirect("/admin")
    }

}

module.exports = controller;