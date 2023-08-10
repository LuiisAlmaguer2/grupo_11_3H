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
        let nuevoProducto;

        if (productos.length === 0) {
            nuevoProducto = {
                id: 1,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                imagen: req.file.filename,
                categoria: req.body.categoria,
                color: req.body.color,
                precio: req.body.precio
            }
        } else {
            let ultimoProducto = productos.pop();
            productos.push(ultimoProducto);

            nuevoProducto = {
                id: ultimoProducto.id + 1,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                imagen: req.file.filename,
                categoria: req.body.categoria,
                color: req.body.color,
                precio: req.body.precio
            }
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

        res.render("productDetail", { elProducto })

    },

    edit: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/products.json")));
        let productoId = parseInt(req.params.id);

        let productoAEditar = productos.find(producto => producto.id === productoId);

        res.render("./admin/editProduct", { productoAEditar })
    },

    update: (req, res) => {
        let img;
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/products.json")));
        const id = parseInt(req.params.id)
        let productoEditado = productos.find(producto => producto.id === id);
        //const imagen = req.file ? req.file.filename : req.body.oldImagen;

        if (req.file && req.file.filename) {
            img = req.file.filename
            fs.unlinkSync(path.resolve(__dirname, "../public/img/" + productoEditado.imagen))
        } else {
            img = productoEditado.imagen;
        }

        // if (req.body.oldImagen) {
        //     console.log(req.body.oldImagen)
        //     if ((req.body.imagen !== req.body.oldImagen) && (req.body.oldImagen !== "")) {
        //         fs.unlinkSync(path.resolve(__dirname, "../public/img/" + productoEditado.oldImagen))
        //     }

        //     // if (req.body.imagen === req.body.oldImagen) {
        //     //     req.body.oldImagen = ""
        //     // }
        // }

        let productoUpdate = productos.map(producto => {
            if (producto.id === id) {
                return ({
                    id: id,
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    imagen: img,
                    categoria: req.body.categoria,
                    color: req.body.color,
                    precio: req.body.precio
                })
            }
            return producto;
        })

        let productosActualizar = JSON.stringify(productoUpdate, null, 2);
        console.log(productosActualizar);
        fs.writeFileSync(path.resolve(__dirname, "../data/products.json"), productosActualizar);

        res.redirect("/admin")
    }

    ,
    delete: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/products.json")));

        let productoAEliminar = parseInt(req.params.id);

        let productoEliminado = productos.find(producto => producto.id === productoAEliminar);

        let productosFinales = productos.filter(producto => producto.id !== productoAEliminar);

        let productosAGuardar = JSON.stringify(productosFinales, null, 2);

        fs.writeFileSync(path.resolve(__dirname, "../data/products.json"), productosAGuardar);

        fs.unlinkSync(path.resolve(__dirname, "../public/img/" + productoEliminado.imagen))

        res.redirect("/admin")
    }

}

module.exports = controller;