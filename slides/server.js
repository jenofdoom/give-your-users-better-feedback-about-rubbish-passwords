var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');

app.use('/lib', express.static(path.join(__dirname, 'lib')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/plugin', express.static(path.join(__dirname, 'plugin')));
app.use('/css', express.static(path.join(__dirname, 'css')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3001, function(){
  console.log('View slides at http://localhost:3001/');
});
