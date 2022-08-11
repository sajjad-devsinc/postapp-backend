const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose
// validation
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
})
// when password change use hash
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
