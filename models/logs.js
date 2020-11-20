var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var logsSchema = new Schema({
  username: String,
  type: String,
  result: Object
},{ timestamps: { createdAt: 'created_at' } });
  
  var logsModel = mongoose.model(
    "logs",
    logsSchema,
    "logs"
  );
  
  module.exports = logsModel