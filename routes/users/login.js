var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var UsersModel = require("../../models/users");
var LogsModel = require("../../models/logs");
var bcrypt = require("bcryptjs");
var cors = require("cors");
var jwt = require("jsonwebtoken");
router.use(cors());
router.use(bodyParser.json());

async function addLog(username,result){
  let log = new LogsModel();
  log.type = 'login';
  log.username = username;
  log.result = result;
  log.save();
}

router.post("/", async function (req, res) {
  let username = req.body.username;
  let user = await UsersModel.findOne({username}).exec();
  if(user){
    let result = await bcrypt.compare(req.body.password, user.password);
    addLog(username, result);  
    res.send({
      unit: user.unit,
      user_id: user._id,
      username: user.username,
      token: user.token,
    });
  }
  else{
    addLog(username, null);  
    res.statusCode = 401;
    res.send('User not found');
  }
});

module.exports = router;
