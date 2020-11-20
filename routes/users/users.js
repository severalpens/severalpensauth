var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());

// main source: https://www.youtube.com/watch?v=Ud5xKCYQTjM&list=PLZlA0Gpn_vH9yI1hwDVzWqu5sAfajcsBQ&index=4



router.get('/',function(req,res){
    res.send('users reached')
  })

var loginRouter = require("./login");
var logoutRouter = require("./logout");
var registerRouter = require("./register");

router.use('/login',loginRouter);
router.use('/logout',logoutRouter);
router.use('/register',registerRouter);



  

module.exports = router;
