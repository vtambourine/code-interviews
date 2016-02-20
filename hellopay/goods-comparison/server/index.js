var path = require('path')
var express = require('express')
var app = express()
var attributes = require('./attributes')

var port = process.env.PORT || 8080

app.get('/product', attributes);

app.use(express.static(process.cwd()))

app.listen(port, function () {
  console.log('Example app listening at port %s', port)
})
