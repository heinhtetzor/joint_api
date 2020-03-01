var mongoose = require('mongoose');
var config = require('config');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  interested_fields: {
    type: String,
    default: null,
  },
});

//custom method to generate authToken 
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get('myprivatekey')); //get the private key from the config file -> environment variable
  return token;
}

module.exports = mongoose.model('User', UserSchema);