const path = require("path");
const fs = require("fs");

const controller = {
    login: (req, res) => {
        return res.render("login");
    },
    register: (req, res) => {
        res.render("register");
    },
    save: (req, res) => {
        let usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/users.json")));
        let nuevoUsuario;


        if (usuarios.length === 0) {
            nuevoUsuario = {
                id: 1,
                email: req.body.email,
                password: req.body.password,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
            }
        } else {
            let ultimoUsuario = usuarios.pop();
            usuarios.push(ultimoUsuario);

            nuevoUsuario = {
                id: ultimoUsuario.id + 1,
                email: req.body.email,
                password: req.body.password,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
            }
        }


        usuarios.push(nuevoUsuario);

        let nuevaLista = JSON.stringify(usuarios, null, 2);

        fs.writeFileSync(path.resolve(__dirname, "../data/users.json"), nuevaLista)

        res.redirect("/")
    }
}

module.exports = controller;