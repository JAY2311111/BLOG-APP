const { verifyToken } = require("../utils/authentication");

function checkAuthentication () {
    return (req, res, next) => {
        var token = req.headers['x_access_token'];

        if(!token){
           return res.status(401).json({ success: false, msg: 'No token provided' })
        }

        try {
            const payload = verifyToken(token);
            req.user = payload;
          return  next();
        } catch (error) {
            return  res.status(401).json({ success: false, msg: 'No token provided' })
        }
    }
}


module.exports =checkAuthentication