const User = require('../models/User')

function userLogged(req, res, next) {


    res.locals.userIsLog = false;

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findByField('email', emailInCookie)

    if (userFromCookie) {
        req.session.userLogged = userFromCookie
    }


    if (req.session && req.session.userLogged) {
        res.locals.userIsLog = true;
        res.locals.userLogged = req.session.userLogged
    }





    next();
}

module.exports = userLogged;