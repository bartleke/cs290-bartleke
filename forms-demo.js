var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  res.render('home');
});

/*****************************************/
app.get('/get-info',function(req,res){
  //title will log to console, but will not change on page?
  var title = "GET Request Received";
  console.log(title);
  var par = [];
  for (var p in req.query){
    par.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = par;
  res.render('get-info', context);
});

app.post('/get-info', function(req,res){
  //title will log to console, but will not change on page?
  var title = "POST Request Received";
  console.log(title);
  var par = [];
  for (var p in req.body){
    par.push({'name':p,'value':req.body[p]})
  }
  var context = {};
  context.dataList = par;
  res.render('get-info', context);
});
/*******************************************/

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
