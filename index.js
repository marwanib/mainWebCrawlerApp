var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
//app.use(bodyParser.text())
 //parse application/json
app.use(bodyParser.json())
var mongoose = require('mongoose');
	var db = mongoose.connection;
	 mongoose.connect('mongodb://Bashar:bashar15@ds039155.mongolab.com:39155/webcrawler', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
		 
    }
});
 var TodoSchema = new mongoose.Schema({
  url: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now }
});
var seed = mongoose.model('seeds', TodoSchema);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});
app.get('/index.htm', function (req, res) {
 res.sendFile( __dirname + "/" + "mor.htm" );
})

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
app.get('/get_url', function (request, response) {
 seed.findOne(function(err, seed){
    if(err) response.send(err);
   else response.send(seed.url);
		seed.remove(seed, function(err, seed){
        if(err) console.log(err);
        else console.log(seed);
});
  });

});
/*app.post('/post_url', function (req, res) {
var input_in = req.body.name;
   console.log(req.body.name);
	res.send(input_in);
	seed.create({url: input_in }, function(err, seed){
    if(err) console.log(err);
    else console.log(seed);
});
});*/

