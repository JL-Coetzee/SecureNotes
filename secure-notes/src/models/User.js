const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

UserSchema.statics.hash = pwd => bcrypt.hash(pwd, 12);
UserSchema.methods.verify = function (pwd) {
  return bcrypt.compare(pwd, this.passwordHash);
};

module.exports = model('User', UserSchema);
