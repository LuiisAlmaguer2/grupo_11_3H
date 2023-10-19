function adminMiddleware(req, res, next) {
    if (!req.session.userLogged || req.session.userLogged.role_id === 2) {
        res.redirect("/")
    }
    next();
}

module.exports = adminMiddleware