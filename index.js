var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
	var db = mongoose.connection;
	 mongoose.connect('mongodb://Bashar:bashar15@ds039155.mongolab.com:39155/webcrawler', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
		 
    }
});
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

var TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
});
var Todo = mongoose.model('Todo', TodoSchema);
Todo.create({name: 'Master Javscript', completed: true, note: 'Getting better everyday'}, function(err, todo){
    if(err) console.log(err);
    else console.log(todo);
});
 Todo.find({completed: true }, function(err, todo){
    if(err) response.send(err);
   else response.json(todo);
  });

});

