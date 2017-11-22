var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');

app.use('/css', express.static(path.join(__dirname, '/dist/css')));
app.use('/fonts', express.static(path.join(__dirname, '/dist/fonts')));
app.use('/js', express.static(path.join(__dirname, '/dist/js')));
app.use('/img', express.static(path.join(__dirname, '/dist/img')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});

http.listen(3000, function(){
  console.log('Demo at http://localhost:3000/');
});
