var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  unit: {type: String, required: false},
  username: String,
  email: String,
  password: String,
  token: String,
});
  
  var usersModel = mongoose.model(
    "users",
    usersSchema,
    "users"
  );
  
  module.exports = usersModel