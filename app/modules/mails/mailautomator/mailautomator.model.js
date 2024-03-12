const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: "email cannot be left blank"
  },
  sent: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('mailer', mailSchema);