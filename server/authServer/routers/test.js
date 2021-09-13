const express = require('express');
const mongoose = require('mongoose');

const UserSchema = require('../UserModel');

const dbu = mongoose.model('Users', UserSchema);

module.exports = express.Router().get('', (req, res) => {
  dbu
    .create({
      title: 'my title1',
      completed: true,
    })
    .then((r) => {
      console.log('result send\n', r);
      res.json(r);
    })
    .catch((error) => {
      console.log('db error\n', error);
      res.json(error);
    });
});
