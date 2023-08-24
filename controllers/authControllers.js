const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const User = require("../models/User");

const controller = {
    login: (req, res) => {
        res.render("login");
    },
    register: (req, res) => {
        res.render("register");
    },
    save: (req, res) => {
        const resultValidation = validationResult(req);



        if (resultValidation.errors.length > 0) {
            return res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })


        } else {
            let usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/users.json")));
            let nuevoUsuario;


            if (usuarios.length === 0) {
                nuevoUsuario = {
                    id: 1,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                }

            } else {
                let ultimoUsuario = usuarios.pop();
                usuarios.push(ultimoUsuario);

                nuevoUsuario = {
                    id: ultimoUsuario.id + 1,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                }

            }


            usuarios.push(nuevoUsuario);

            let nuevaLista = JSON.stringify(usuarios, null, 2);

            fs.writeFileSync(path.resolve(__dirname, "../data/users.json"), nuevaLista)

            res.redirect("/")
        }
    },

    loginProcess: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);

        if (userToLogin) {
            let correctPassword = bcrypt.compareSync(req.body.password, userToLogin.password)

            if (correctPassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if (req.body.logged) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                }
                res.redirect("/auth/perfil")

            } else {
                return res.render('login', {
                    errors: {
                        email: {
                            msg: "El correo o la contrasena no son correctos"
                        }
                    }
                })
            }

        } else {
            return res.render('login', {
                errors: {
                    email: {
                        msg: "Este email no se encuentra en nuestra BD"
                    }
                }
            })
        }

    },

    userProfile: (req, res) => {
        //console.log(req.cookies.userEmail)
        res.render("userProfile", {
            user: req.session.userLogged
        })
    },

    logout: (req, res) => {
        res.clearCookie('userEmail')
        req.session.destroy();
        res.redirect("/")
    }

}


module.exports = controller;