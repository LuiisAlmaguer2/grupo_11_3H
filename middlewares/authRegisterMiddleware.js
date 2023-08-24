function userRegistered(req, res, next) {
    res.locals.userIsRegistered = false;

    if (req.session && req.session.userRegistered) {
        res.locals.userIsRegistered = true;
        res.locals.userRegistered = req.session.userRegistered

    }

    next();
}

module.exports = userRegistered;


