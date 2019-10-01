var express = require('express');
var app = express();

var apiRoutes = require('./routes/api');
var naveRoutes = require('./routes/nave');
var mongoose = require('mongoose');
var Nave = require('./models/nave');
var bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost:27017/yamblet', {useUnifiedTopology:true,useNewUrlParser:true}, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});


app.get('/', function(req, res) {
  res.send('hello world');
});

app.use('/api', apiRoutes);
app.use('/nave',naveRoutes);

app.listen(3000, function (err) {
    if (err) throw err;
    console.log("Server is Running on port " + 3000);
});
