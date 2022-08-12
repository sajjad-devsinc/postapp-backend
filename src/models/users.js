const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')
const { Schema } = mongoose
// validation
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [isEmail, 'Please fill a valid email address'],
    },
    name: { type: String, required: true, minLength: 6 },
    password: {
        type: String,
        required: true,
        min: 8,
        match: [
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
            'i',
            'Please fill a valid password',
        ],
    },
})

UserSchema.pre('save', async function (next) {
    const hash = bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

UserSchema.methods.isValidPassword = async function (password) {
    const user = this
    const compare = await bcrypt.compare(password, user.password)

    return compare
}
const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel
