const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    if (!authHeader.startsWith('Bearer ')) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
        req.decodedEmail = decodedToken.email;
    } catch {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    next();
}