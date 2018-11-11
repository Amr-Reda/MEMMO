const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // localUser:{

    userName : {
      type : String,
      required : true
    },

    email : {
      type : String,
      required : true
    },

    password : {
      type : String,
      required : true
    }

  // }
  // googleUser:{
  //
  //   userName : {
  //     type : String,
  //     required : true
  //   },
  //
  //   email : {
  //     type : String,
  //     required : true
  //   },
  //
  //   googleId : {
  //     type : String,
  //   }
  //
  // },
  //
  // facebookUser:{
  //
  //   userName : {
  //     type : String,
  //     required : true
  //   },
  //
  //   facebookId : {
  //     type : String,
  //   }
  //
  // }

});
// User we will use it in the backend as a model
// user the name of collection
// userSchema it will export to user collection
const User = mongoose.model('user', userSchema);
module.exports=User;
