const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const db = require("../database/models")

const controller = {
    login: (req, res) => {
        res.render("login");
    },
    register: (req, res) => {
        res.render("register");
    },

    save: (req, res) => {
        const resultValidation = validationResult(req);
        let nuevoUsuario;
        let user;

        if (resultValidation.errors.length > 0) {
            return res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })


        } else {

            db.User.findAll({
                where: {
                    email: req.body.email.toUpperCase()
                }
            })
                .then((usuarios) => {
                    if (usuarios.length > 0) {
                        res.render('register', {
                            errors: {
                                email: {
                                    msg: 'El email ya esta registrado'
                                }
                            }
                        })

                    } else {

                        nuevoUsuario = db.User.create({
                            name: req.body.nombre,
                            last_name: req.body.apellido,
                            email: req.body.email.toUpperCase(),
                            password: bcrypt.hashSync(req.body.password, 10),
                            role_id: 1
                        })
                            .then((usuario) => {
                                if (usuario) {
                                    req.session.userLogged = (JSON.parse(JSON.stringify(usuario)))



                                    if (req.body.logged) {
                                        res.cookie('userEmail', req.body.email.toUpperCase(), { maxAge: (1000 * 60) * 60 })
                                    }
                                    res.redirect('/auth/perfil')
                                }
                            })

                    }


                })

        }
    },


    loginProcess: (req, res) => {
        db.User.findOne({
            where: { email: req.body.email.toUpperCase() }
        })
            .then((usuario) => {
                if (usuario) {
                    let correctPassword = bcrypt.compareSync(req.body.password, usuario.password)

                    if (correctPassword) {
                        req.session.userLogged = usuario

                        if (req.body.logged) {
                            res.cookie('userEmail', req.body.email.toUpperCase(), { maxAge: (1000 * 60) * 60 })
                        }
                        res.redirect('/auth/perfil')
                    }
                    else {
                        return res.render('login', {
                            errors: {
                                email: {
                                    msg: "El correo o la contraseña no son correctos"
                                }
                            }
                        })
                    }
                }
                else {
                    return res.render("login", {
                        errors: {
                            email: {
                                msg: "El correo o la contraseña no son correctos"
                            }
                        }
                    })
                }
            })



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