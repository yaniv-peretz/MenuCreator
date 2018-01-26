module.exports = (req, res, next) => {
    if (!req.session.auth) {
        res.status(401).send("You are not logged in!");
    } else {
        next();
    }
}