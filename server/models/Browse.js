const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  allVisitor: { type: String },
  todayVisitor: { type: String }
})

module.exports = mongoose.model('Browse', schema)