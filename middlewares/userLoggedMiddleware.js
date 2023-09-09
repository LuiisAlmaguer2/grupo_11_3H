const User = require('../models/User')

function userLogged(req, res, next) {

    res.locals.userIsLog = false;

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findByField('email', emailInCookie)

    //console.log("UserFromCookie: ", userFromCookie)

    if (userFromCookie) {
        req.session.userLogged = userFromCookie
    }



    //prueba inicio


    //prueba fin

    if (req.session && req.session.userLogged) {
        res.locals.userIsLog = true;
        res.locals.userLogged = req.session.userLogged
    }

    //console.log(req.session.userLogged)

    // console.log("res.locals.userIsLog: ", res.locals.userIsLog)



    next();
}

module.exports = userLogged;