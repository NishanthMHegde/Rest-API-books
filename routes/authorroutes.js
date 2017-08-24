const Story = require('../models/story');
const Person = require('../models/person');
const express = require('express');
const router = express.Router();


router.post('/person', function(req, res, next) {
  //   Person.create({
  //     name:req.body.name,
  //     age:req.body.age
  //   }).then(function(person){
  //     Story.create({
  //   title: req.body.title,
  //   creator: person._id
  //
  // }).then(function(story){
  //   Person.update(stories.push(story));
  //
  //   res.send(story);
  // });
  //   }).catch(next);
  // });
  //

  var person = new Person({
    name: req.body.name,
    age: req.body.age
  });
  person.save(function(err) {
    if (err)
      res.sendStatus(422);

    var story = new Story({
      title: req.body.title,
      creator: person._id
    });
    story.save(function(err) {
      if (err)
        return res.sendStatus(422);

    });
    person.stories.push(story);
    person.save(function(err) {
      if (err)
        return res.sendStatus(422);
      res.send(person);
    });
  });



});

router.get('/story', function(req, res, next) {
  Story.find({}).populate('creator').exec(function(err, story) {
    if (err) {
      res.sendStatus(422);
    }


    res.send(story);

  }).catch(next);
});

router.put('/person/:id', function(req, res, next) {
  var story = new Story({
    title: req.body.title,
    creator: req.params.id
  });
  story.save(function(err) {
    if (err)
      return res.sendStatus(422);

  });
  Person.findByIdAndUpdate(req.params.id, {
      $push: {
        stories: story
      }
    }

    // function(err, data) {
    //   if (err)
    //     return res.sendStatus(422);
    // }
  ).then(function(person){
    res.send(person);
  });
});

module.exports = router;
