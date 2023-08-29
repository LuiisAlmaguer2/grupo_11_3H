const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const User = require("../models/User");
const { setSession } = require("../services/authService");

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

            //Inicio codigo prueba

            // req.session.userLogged = nuevoUsuario

            // delete nuevoUsuario.password;
            // req.session.userLogged = nuevoUsuario;

            // if (req.body.logged) {
            //     res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
            // }

            setSession(req, res, req.body.logged, nuevoUsuario)
            res.redirect("/auth/perfil")

            //Fin codigo prueba




        }
    },


    loginProcess: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);

        if (userToLogin) {
            let correctPassword = bcrypt.compareSync(req.body.password, userToLogin.password)

            if (correctPassword) {
                delete userToLogin.password;
                setSession(req, res, req.body.logged, userToLogin)

                // req.session.userLogged = userToLogin;

                // if (req.body.logged) {
                //     res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                // }
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
                        msg: "Este email no se encuentra en nuestra BD" //cambiar mensaje por seguridad
                    }
                }
            })
        }

    },

    userProfile: (req, res) => {
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