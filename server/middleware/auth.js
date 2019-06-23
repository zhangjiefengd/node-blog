module.exports = options => {
  const jwt = require('jsonwebtoken');
  const AdminUser = require('../models/AdminUser')
  const assert = require('http-assert')

  return async (req, res, next) => {
    const token = String(req.headers.authorization || ' ').split(' ').pop()
    assert(token, 401, '请先登录')
    try {
      const { id } = jwt.verify(token, req.app.get('secret'))
      req.user = await AdminUser.findById(id)
      await next()
    } catch (err) {
      assert(req.user, 401, '请先登录')
     if (err.name === 'TokenExpiredError') {
       assert(null, 401, '登录过期，请重新登录')
     }
    }
  }
}