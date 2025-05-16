const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


// Define the User schema
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

//Static method for hashing plain-text passwords
UserSchema.statics.hash = pwd => bcrypt.hash(pwd, 12);
// Instance method for verifying a plain-text password against the stored hash
UserSchema.methods.verify = function (pwd) {
  return bcrypt.compare(pwd, this.passwordHash);
};

module.exports = model('User', UserSchema);
