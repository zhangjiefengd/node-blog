const express = require("express");

const app = new express();

app.set('secret', '12345')

app.use(require('cors')())
app.use(express.json())

// 静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app);
require('./routes/admin')(app);
require('./routes/custom')(app);

app.listen(3000, () => {
  console.log('http://localhost:3000')
})