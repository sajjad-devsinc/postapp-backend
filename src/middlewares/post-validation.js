const { body, validationResult } = require('express-validator')
exports.validate = (method) => {
    // use method for validation
    switch (method) {
        case 'addPost': {
            return [
                body('title', 'Invalid title').exists().isLength({ min: 6 }),
                body('body', 'there should be a proper boby')
                    .exists()
                    .isLength({ min: 10 }),
                body('isPublish', 'Invalid isPublish Value')
                    .exists()
                    .isBoolean(),
                body('userId', 'There should be a proper userID').isMongoId(),
                (req, res, next) => {
                    const errors = validationResult(req)
                    if (!errors.isEmpty())
                        return res.status(422).json({ message: errors.array() })
                    next()
                },
            ]
        }
        case 'editPost': {
            return [
                body('title', 'Invalid title').exists(),
                body('body', 'there should be a proper boby').exists(),
                body('isPublish', 'Invalid isPublish Value')
                    .exists()
                    .isBoolean(),
                body('userId', 'There should be a proper userID').isMongoId(),
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
