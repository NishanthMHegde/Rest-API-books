const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
   name: String,
   age:String,
   stories:[{type:Schema.Types.ObjectId,ref: 'Story'}]
});

const Person = mongoose.model('Person',PersonSchema);
module.exports=Person;
