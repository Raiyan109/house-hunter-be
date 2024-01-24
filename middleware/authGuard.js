const jwt = require('jsonwebtoken')

const authGuard = (req, res, next) => {
    const { authorization } = req.headers

    try {
        const token = authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { userId } = decoded
        req.userId = userId

        next()
    } catch (error) {
        next('Authentication Failed')

    }
}

module.exports = authGuard