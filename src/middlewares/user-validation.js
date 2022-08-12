const { body } = require('express-validator')
exports.validate = (method) => {
    // use method for validation
    switch (method) {
        case 'signup': {
            return [
                body('email', 'there should be a proper valid email')
                    .exists()
                    .isEmail(),
                body('name', 'there should be a proper username').exists(),
                body(
                    'password',
                    'Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. '
                )
                    .exists()
                    .isLength({ min: 8 })
                    .matches(
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/
                    ),
                (req, res, next) => {
                    const errors = validationResult(req)
                    if (!errors.isEmpty())
                        return res.status(422).json({ errors: errors.array() })
                    next()
                },
            ]
        }
        case 'login': {
            return [
                body('email', 'there should be a proper valid email')
                    .exists()
                    .isEmail(),
                body(
                    'password',
                    'Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. '
                )
                    .exists()
                    .isLength({ min: 8 })
                    .matches(
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/
                    ),
                (req, res, next) => {
                    const errors = validationResult(req)
                    if (!errors.isEmpty())
                        return res.status(422).json({ errors: errors.array() })
                    next()
                },
            ]
        }
    }
}
