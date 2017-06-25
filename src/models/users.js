var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
   email: {
    type: String,
    unique: true,
    required: true
  },
  username:{
      type: String,
      required:true,
      unique:true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name:{
    type:String,
    required: true
  },
    role: {
      type: String,
      required: true,
      enum: ['Employee','Manager'],
      default: 'Employee'
  }
});

module.exports = mongoose.model('User', UserSchema);