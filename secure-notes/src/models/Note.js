const { Schema, model, Types } = require('mongoose');

module.exports = model('Note', new Schema(
  {
    owner: { type: Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    body: { type: String, default: '' }
  },
  { timestamps: true }
));
