var jwt = require('jsonwebtoken');

const SECRET_KEY = 'SECRET_KEY'

module.exports = async (request, response, next) => {
    const token = request.headers['token']; 
    if (!token) {
        return response.status(200).json({
            message: 'No Token Found',
        });
    }

    try {
        let user = await jwt.verify(token, SECRET_KEY)
        request.email = user.email
        next()
    } catch (error) {
        return response.status(200).json({
            message: 'Invalid token',
        });
    }
}