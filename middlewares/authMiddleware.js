function authMiddleware(req, res, next) {
    if (!req.session.userLogged) {
        res.redirect("/auth/login")
    }
    next();
}

module.exports = authMiddleware;