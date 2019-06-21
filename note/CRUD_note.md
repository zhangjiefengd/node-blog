## 后台CRUE ##
>利用**路由**传参的方式让合并重复的增删改查功能，使用`express`的中间件(即在路由执行之前统一的处理其不同的数据模型)
1. 路由传参方式如下：
```
// 以express为例
import express from 'express';
var app =  express();
const router = express.Router({
  mergeParams: true    // 保留其父元素的params，若子集与其冲突将其覆盖
})
router.use('/admin/api/:resource', handler);
// 此处的resource为后台接收参数的属性,handler函数对其不同数据模型进行处理

function async handler(req, res, next) {
  const modelName = require('inflection').classify(req.params.resource)    // 可以使用req.params.resource接收此参数，后台根据参数的不用而处理不同的数据，CRUD接口统一采用复数形式，使用inflection将其转换为单数（数据模型,将单词间'_'形式转化为驼峰命名形式）
  req.Model = reuqire(`../models/${modelName}`)
  next()
}

// 新增
// 保存模型的三种方式
// 1. new一个Schema实例对象，并调用save()函数
// 2. Schema的create(Object, handle)函数
// 3. insertMany(Array, handle)
router.post('/', async (req, res) => {
  const model = await req.Model.create(req.body)
  res.send(model)
})
// 修改
router.put('/:id', async (req, res) => {
  const model = await req.Model.findByIdAnDUpdate(req.params.id, req.body)   // 使用应在连接mongoose时设置useFindAndModify为false（mongoose.set('useFindAndModify': false)）
})
// 删除
router.delete('/:id', async (req, res) => {
  await req.Model.findByIdAndDelete(req.params.id, req.body)
  res.send({
    success: true
  })
  // 查找
router.get('/:id', async (req, res) => {
  const model = await req.Model.findById(req.params.id)
  res.send(model)
})
})
```