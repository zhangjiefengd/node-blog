module.exports = app => {
  const express = require("express");
  const jwt = require('jsonwebtoken');
  const AdminUser = require('../../models/AdminUser')
  const assert = require('http-assert')

  const router = express.Router({
    mergeParams: true
  });
  // 新增
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 修改
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  // 登陆校验
  const authMiddleware = require('../../middleware/auth')
  // 获取列表
  router.get('/', authMiddleware(), async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })
  // 获取某个内容
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 模型关联中间件
  const resourceMiddleware = require('../../middleware/resource')
  // 定义公共模块，inflection包转换单复数
  // 在挂载路由之前统一对其参数进行单数转换并将其挂载到req，是之后的router能访问其模型
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router);

  // 上传文件处理，使用multer获取文件
  const multer = require('multer')
  var storage = multer.diskStorage({
    destination(req, file, cb) {
      // console.log(req, file)
      cb(null, __dirname + '/../../uploads')
    },   // 存储的文件夹
    filename(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()) // 未设置文件名则生成随机的文件名
    }
  })
  const upload = multer({ storage: storage }).single('file')
  // 在请求之前在req加上上传的file
  app.post('/admin/api/upload', authMiddleware(), async (req, res) => {
    upload(req, res, err => {
      if (err instanceof multer.MulterError) { } else if (err) { }
      const file = req.file
      file.url = `http://localhost:3000/uploads/${file.filename}`
      res.send(file)
    })
  })

  // 登陆
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 找用户,验证密码，返回token
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')

    const isValid = require('bcrypt').compareSync(password, user.password)

    assert(isValid, 422, '密码错误')

    const token = jwt.sign({ id: user._id }, app.get('secret'), { expiresIn: '24h' })
    res.send({ token })
  })

  // 错误处理
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}