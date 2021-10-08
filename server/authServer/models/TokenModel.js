const { Schema, model } = require('mongoose');

const TokenModel = new Schema({
  isActivated: {
    type: Schema.Types.ObjectId,
    refreshToken: { type: String, required: true },
  },
  refreshToken: {
    type: String,
  },
});

module.exports = model('TokenModel', TokenModel);
