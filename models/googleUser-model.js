const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName : {
    type : String,
    required : true
  },

  email : {
    type : String,
    required : true
  },

  googleId : {
    type : String,
  }

});
// User we will use it in the backend as a model
// user the name of collection
// userSchema it will export to user collection
const googleUser = mongoose.model('googleUser', userSchema);
module.exports=googleUser;
