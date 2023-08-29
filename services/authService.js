const authService = {

    setSession: (req, res, rememberMe, user) => {
        req.session.userLogged = user;

        if (rememberMe) {
            res.cookie('userEmail', user.email, { maxAge: (1000 * 60) * 60 })
        }
    }
}

module.exports = authService; 