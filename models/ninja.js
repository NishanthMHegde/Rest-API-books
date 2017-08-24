const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ninjaSchema = new Schema(
  {
    name: {
      type:String,
      required: [true,'ninja required']
    },
    age:{
      type:String
    },
    available: {
      type: Boolean,
      required: false
    }
  }
);

const ninja = mongoose.model('coolninjas',ninjaSchema);
module.exports = ninja;
