const express = require("express");
const routes = require('./routes/ninjaroutes');
const authroutes = require('./routes/authorroutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://localhost/newninja');
mongoose.Promise =global.Promise;
app.use(bodyParser.json());
app.use('/api',routes);


app.use(function(err,req,res,next){
  res.status(422).send({
    error:err.message
  });
});
app.use('/storyapi',authroutes);
app.use(function(err,req,res,next){
  res.status(422).send({
    error:err.message
  });
});
app.listen(4000,function(){
  console.log("I am listening");
});
