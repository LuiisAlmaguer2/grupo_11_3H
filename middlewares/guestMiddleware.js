function guestMiddleware(req, res, next) {
    if (req.session.userLogged) {
        res.redirect('/auth/perfil')
    } else {
        next()
    }

}

module.exports = guestMiddleware;