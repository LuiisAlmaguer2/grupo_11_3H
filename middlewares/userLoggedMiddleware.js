
// let userFromCookie = User.findByField('email', emailInCookie)



// db.Usuario.findOne({
//     where: { email: emailInCookie }
// })
//     .then((usuario) => {
//         console.log(usuario)
//         if (usuario) {
//             req.session.userLogged = emailInCookie
//         }
//     })

//console.log("UserFromCookie: ", userFromCookie)

// if (userFromCookie) {
//     req.session.userLogged = userFromCookie
// }



//prueba inicio
// const User = require('../models/User')

const db = require("../database/models")

function userLogged(req, res, next) {

    res.locals.userIsLog = false;
    res.locals.userLogged = req.session.userLogged



    if (res.locals.userLogged) {
        db.User.findOne({
            where: { email: res.locals.userLogged.email }
        })
            .then((usuario) => {
                if (usuario) {
                    req.session.userLogged = res.locals.userLogged
                }

                if (req.session && req.session.userLogged) {
                    res.locals.userIsLog = true;
                    res.locals.userLogged = req.session.userLogged
                }
                next()
            }

            )

    } else {
        next()
    }



    //prueba fin


    // console.log(req.session.userLogged)

    // console.log("res.locals.userIsLog: ", res.locals.userIsLog)



}

module.exports = userLogged;