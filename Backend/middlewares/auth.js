const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token  =  req.header('x-auth-token');

    if(!token){
        return res.status(401).json({ msg: 'not authorized'});
    }

    try {
        const cifrated = jwt.verify(token, process.env.SECRET);
        req.user = cifrated.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'not valid token'});
    }
}