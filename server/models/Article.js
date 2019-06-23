const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  abstruct: { type: String },
  images: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Image' }],
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  author: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'AdminUser' }],
  visitorNum: { type: Number }
}, {
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'updateTime'
    }
  })

module.exports = mongoose.model('Article', schema)




