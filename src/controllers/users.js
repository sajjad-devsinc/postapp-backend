const passport = require('passport')
const jwt = require('jsonwebtoken')
const signup = (req, res) => {
    res.json({
        message: 'Signup successful',
        user: req.user,
    })
}

const login = async (req, res, next) => {
    passport.authenticate('login', async (err, user) => {
        try {
            if (err || !user) {
                const error = new Error('An error occurred.')
                return next(error)
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error)
                const body = { _id: user._id, email: user.email }
                const token = jwt.sign({ user: body }, process.env.SECRET_KEY)
                return res.json({ token })
            })
        } catch (error) {
            return next(error)
        }
    })(req, res, next)
}

module.exports = { signup, login }
