const { Schema, model } = require("mongoose");

const UserModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
