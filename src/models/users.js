const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true}

});

UserSchema.pre(
  'save',
  async function(next) {
    console.log(this);
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    console.log(hash);
    this.password = hash;
    next();
  }
);

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}
const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;