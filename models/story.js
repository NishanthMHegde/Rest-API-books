const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StorySchema = new Schema({
  creator: [{type:Schema.Types.ObjectId,ref: 'Person'}],
  title:String
});

const Story = mongoose.model('Story',StorySchema);
module.exports = Story;
