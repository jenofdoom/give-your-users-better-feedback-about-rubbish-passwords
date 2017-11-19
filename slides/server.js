var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use('/lib', express.static('lib'));
app.use('/js', express.static('js'));
app.use('/plugin', express.static('plugin'));
app.use('/css', express.static('css'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('View slides at http://localhost:3000/');
});
