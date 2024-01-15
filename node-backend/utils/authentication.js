const JWT = require('jsonwebtoken');

const secret ="jaydeep@#$%^*1234blogapp@*&^%$";


function generateToken(user) {
        const payload = {
            _id : user._id,
            email : user.email,            
        };
        const token = JWT.sign(payload,secret, { expiresIn: '24h' } )

        const userData = user._doc
        return {user : {id :userData._id,fullName: userData.fullName}, token};
}

function verifyToken(token) {
        const payload = JWT.verify(token, secret);
        return payload;
}

module.exports = {generateToken,verifyToken };