const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  college: { type: String },
  introduction: { type: String },
  avatar: { type: String }
})

module.exports = mongoose.model('Individual', schema)
