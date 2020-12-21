exports.authenticated = (req, res, next) => {
    res.locals.isAuthenticated = req.session.isAuthenticated;
    if (req.session.isAuthenticated) {
        res.locals.user = req.session.user;
        res.locals.level = req.session.level;
    }
    next();
};

exports.requireAuthentication = (req, res, next) => {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.redirect('/login');
    }
};

exports.notRequireAuthentication = (req, res, next) => {
    if (!req.session.isAuthenticated) {
        next();
    } else {
        res.redirect('/login');
    }
};