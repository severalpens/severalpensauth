var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var UsersModel = require("../../models/users");
var LogsModel = require("../../models/logs");
var bcrypt = require('bcryptjs');
var cors = require('cors');
var jwt = require('jsonwebtoken');
router.use(cors());
router.use(bodyParser.json());

router.post("/", async function(req, res) {
  if(req.body.password && req.body.username){
  bcrypt.hash(req.body.password,10, async (err,password) => {
    if(err){return res.status(403).send()}
    UsersModel.count({username: req.body.username},async (err2,count) => {
      let log = new LogsModel();
      log.type = 'register';
      let username = req.body.username;
      log.username = username;
      await log.save();
  
      if(count === 0){
        let newUser =  new UsersModel();
         let unit = req.body.unit;
        newUser.unit = unit;
        newUser.username = req.body.username;
        newUser.password = password;
        newUser.save((err,savedUser) => {
        jwt.sign({username: req.body.username, _id : savedUser._id},
          process.env.ACCESS_TOKEN_SECRET, async (err,token) => {
            if (err) {
              log.result = err;
            }
            else{
              log.result = token;
            }
            await log.save()
            newUser.token = token;
            newUser.save(async (err2,savedAgain) => {
              res.send({
                unit,
                user_id: savedAgain._id,
                username: savedAgain.username,
                token: savedAgain.token,
              });
            })
            })
          });
      }
    });
  });
}
else{
  res.status(404)
}
});




module.exports = router;
