const { Schema, model } = require('mongoose');

const SocketMessagesSchema = new Schema({
  date: {
    type: Schema.Types.Date,
    required: true,
    default: Date.now,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  text: {
    type: Schema.Types.String,
    required: true,
  },
});

module.exports = model('SocketMessages', SocketMessagesSchema);
