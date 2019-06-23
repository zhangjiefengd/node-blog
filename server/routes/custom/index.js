module.exports = app => {
  const express = require('express')
  const Article = require('../../models/Article')
  const Category = require('../../models/Category')
  
  app.get('/articles', async (req, res) => {
    const articles = await Article.find().populate('author').populate('categories').exec()
    res.send(articles)
  })

  app.get('/article/:id', async (req, res) => {
    const article = await Article.findById(req.params.id).populate('author').exec()
    res.send(article)
  })
}