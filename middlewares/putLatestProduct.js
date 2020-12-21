exports.putLatestProduct = (req, res, next) => {
    res.locals.latestProduct = req.cookies['looking'];
    next();
};