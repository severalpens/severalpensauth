var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var clientsSchema = new Schema({
    client_id: String,
    client_secret: String, 
    redirect_uris: Array
  });
  
  var clientsModel = mongoose.model(
    "clients",
    clientsSchema,
    "clients"
  );
  
  module.exports = clientsModel