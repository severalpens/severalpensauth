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

router.post("/", function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    let log = new LogsModel();
    log.type = 'login';
    let username = req.body.username;
    log.username = username;
    log.save();
    let tmpPassword = req.body.password;
    UsersModel.findOne({ username }, (err, user) => {
      if (err) {
        return res.send(err);
      }
      bcrypt.compare(tmpPassword, user.password, (err, success) => {
        if (err) {
          log.result = err;
          return res.send(err);
        }
        else{
          log.result = success;
        }
        log.save()
        res.send({
          unit: user.unit,
          user_id: user._id,
          username: user.username,
          token: user.token,
        });
      });
    });
  } catch (err) {
    return res.send(err);
  }
});

module.exports = router;
