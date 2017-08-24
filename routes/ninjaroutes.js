const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');
const jwt = require('jsonwebtoken');
router.get('/ninja',function(req,res,next){

  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader!==undefined){
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token =bearerToken;
} else {

    res.sendStatus(403);

}


  jwt.verify(req.token,'my_secret_key',function(err,data){
    if(err){
      res.sendStatus(403);
    }
    else{
        Ninja.find({}).then(function(ninjas){
          res.send(ninjas);
        });
    }
  });

});

router.post('/ninja',function(req,res,next){
  Ninja.create(req.body).then(function(ninja){
    const token = jwt.sign({ninja},'my_secret_key');
    res.send({
      user:ninja,
      token:token

    });
  }).catch(next);
});

router.put('/ninja/:id',function(req,res,next){
Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(function(ninja){
  Ninja.findOne({_id:req.params.id}).then(function(ninja){
    res.send(ninja);
  });
}).catch(next);
});
router.delete('/ninja/:id',function(req,res,next){
  Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
    res.send(ninja);
  }).catch(next);
});

module.exports = router;
