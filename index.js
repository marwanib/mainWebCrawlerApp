var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.text());
 //parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
var url_weightSchema=new mongoose.Schema({
  url: String,
  weight:Number,
  updated_at: { type: Date, default: Date.now }
});
 var indexSchema = new mongoose.Schema({
  indexword: String,
  urls:[url_weightSchema],
  updated_at: { type: Date, default: Date.now }
});
var indexword = mongoose.model('indexwords', indexSchema);

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
   else response.json(seed);
		seed.remove(seed, function(err, seed){
        if(err) console.log(err);
        else console.log(seed);
});
  });

});
app.post('/post_url', function (req, res) {
var input_in = req.body.url;
   console.log(req.body.url);
	res.send(input_in);
	var substring="http://";
	if(input_in.indexOf(substring) > -1) seed.create({url: input_in }, function(err, seed){
    if(err) console.log(err);
    else console.log(seed);
});
});


app.post('/post_indexword', function (req, res) {
var input_url = req.body.url;
var input_indexword=req.body.indexWord;
var input_weight=req.body.weight;
indexword.count({indexword:input_indexword},function(err,count){
if(count == 0) indexword.create({indexword:input_indexword,urls:{url:input_url ,
  weight:input_weight}},function(err, index){
    if(err) console.log(err);
    else console.log(index);
});
else indexword.count({indexword:input_indexword,urls:{url:input_url}},function(err, count){
    if(err) console.log(err);
    else if(count == 0) indexword.update({indexword:input_indexword},{$push:{urls:{url:input_url , weight:input_weight}}},function(err,index){
	if(err) console.log(err);
	else console.log(index);
	});
});
});
res.send(input_indexword);
});
