## Multer ##
>使用`Multer`中间件上传文件
1. 只设置文件的存放位置`multer({ dest: 'file_location' })`
2. 更多参数使用`storage`替代`dest`
```
// storage分为DiskStorage和MemoryStorage
var storage = multer.diskStorage({
  destination(req, file, cd) {
    cd(null, '/tmp/my-uploads')
  },   // 存储的文件夹
  filename(req, file, cd) {
    cd(null, file.filedname + '_' + Date.now()) // 未设置文件名则生成随机的文件名
  }
})
var upload  = multer({storage})

// 内存存储,文件过大或太多将造成程序内存溢出
var storage = multer.memoryStorage()
var upload = multer({storage})
```
---
请求上传及错误处理
```
var storage = multer.diskStorage({
  destination(req, file, cd) {
    cd(null, '/../../uploads')
  },   // 存储的文件夹
  filename(req, file, cd) {
    cd(null, file.fieldname + '_' + Date.now()) // 未设置文件名则生成随机的文件名
  }
})
var upload = multer({ storage }).single('file')
app.post('/admin/api/upload', (req, res) => {
    upload(req, res, err => {
      if (err instanceof multer.MulterError) {
        // 发生错误
      } else if (err) {
        // 发生错误
      }
      const file = req.file
      file.url = `http://localhost:3000/uploads/${file.filename}`
      res.send(file)
    }) 
})
```