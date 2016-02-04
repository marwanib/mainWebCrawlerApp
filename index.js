var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
app.get('/db', function (request, response) {
mongoose.connect('mongodb://Bashar:bashar15@ds039155.mongolab.com:39155/webcrawler');
	var db = mongoose.connection;
   db.on('error', console.error.bind(console, 'connection error:'));
   db.once('open', function() {
  console.log("Hello World!");
});
})

