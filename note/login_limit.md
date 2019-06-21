## 登录模块 ##

### 1. 数据处理

----
使用`bcrypt`对其加密
在存放用户的密码的时候使用`bcrypt`加密后保存在数据库
```
// 在模型中对password的set属性进行重写
password: {
  type: String,
  set(val) {
    return require('bcrypt').hashAync(val, 10)
  }
}
```
对用户进行修改的时候，不需要将其密码返回，所以需要在数据模型的版块加上`select: false`
```
password: {
  type: String,
  select: false,
  set(val) {
    return require('bcrypt').hashAync(val, 10)
  }
}
```
当查询用户的时候是不会返回密码的，想要返回密码字段需要加上`.select('+password')`就是将模型中设置`select: false`的属性在`select`中加上属性的名称。
`const user = await AdminUser.findOne({username}).select('+password')`

### 2. 数据验证

----
使用`bcrypt`的`compareSync(password, user.password)`验证用户输入的密码和在数据库查询的密码是否一致

### 3. 生成Token

---
使用`jsonwebtoken`来生成我们需要的token
```
// 简单的用法HMAC SHA256
const jwt = require('jsonwebtoken');
const token = jwt.sign({your encrypt data}, 'String to decode')
// 还可使用expiresIN为其分配有效期
jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
  data: 'your encrypt data'
}, 'secret', callback);
const tokenWithExpires = jwt.sign({data: 'your encrypt data'}, 'String to decode', {expiresIn: 'time'}) // time若纯数字则是ms为单位，可使用d表示天，h表示小时

// 错误的捕获可以用回调(callback)或者使用try-catch去捕获err.name === 'TokenExpiredError'的错误
// RSA SHA256非对称加密方法，私钥加密(需声明算法)，公钥解密的方式
const privatedKey = fs.readFileSync('private.key')
const tokenWithRSA = jwt.sign({data: 'your encode data'}, privatedKey, {algorithm: 'RS256'})
```
验证(即不完全的解码)
```
import jwt from 'jsonwebtoken'
const decrypt = jwt.verify(auth_token, '加密时设置的字符串')
const cert = fs.readFileSync('public.pem')
const decryptByPublic = jwt.verify(auth_token, cert)
```
解码
```
jwt.decode(token, {complete: true}) // 无complete返回的结果和verify返回的结果一样
```
**更多验证功能可根据需求来添加**
### 4. 错误信息 ###

---
在登陆的时候需要处理比较多的`http-errors`所以使用`http-assert`(更加便捷)这个包来简化处理返回的错误，也可以使用`http-errors`（周下载比较高）
`http-errors`的使用是
```
var createError = require('http-errors')
var express = require('express')
var app = express()
 
app.use(function (req, res, next) {
  if (!req.user) return next(createError(401, 'Please login to view this page.'))
  next()
})
```
`http-assert`例子如下
```
var assert = require('http-assert')
assert(condition, ErrorCode, ErrorMessage)
// condition错误将抛出一个http错误
```