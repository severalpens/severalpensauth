var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var UsersModel = require("../../models/users");
var LogsModel = require("../../models/logs");
var bcrypt = require('bcryptjs');
var cors = require('cors');
var jwt = require('jsonwebtoken')
router.use(cors());
router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  let log = new LogsModel();
  log.type = 'logout';
  log.save();
  res.send('logged out');
});

router.post("/", function(req, res, next) {
  let user = req.body.user;
  let log = new LogsModel();
  log.type = 'logout';
  log.username = user.username;
  log.save();
  res.send('logged out');
  UsersModel.updateOne({username: user.username},{token: ''},(err,result) => {
    if(err) {return res.send(err)};
    res.send(result);
  })
});




module.exports = router;
