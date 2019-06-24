module.exports = app => {
  const express = require('express')
  const Article = require('../../models/Article')
  const Category = require('../../models/Category')
  
  app.get('/articles', async (req, res) => {
    const page = {
      pageSize: 5,
      total: Number,
      number: Number(req.query.number)
    }
    const articles = await Article.find().populate('author').populate('categories').skip((req.query.number-1) * page.pageSize).limit(page.pageSize)
    page.total = await Article.find().count()
    
    res.send({articles, page})
  })

  app.get('/article/:id', async (req, res) => {
    const article = await Article.findById(req.params.id).populate('author').exec()
    res.send(article)
  })
}