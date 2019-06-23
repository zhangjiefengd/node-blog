const mongoose = require('mongoose')

const schema = mongoose.Schema({
  url: { type: String },
  parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Article'}
})

module.exports = mongoose.model('Image', schema)