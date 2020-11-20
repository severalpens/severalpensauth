var express = require("express");
var router = express.Router();
var cors = require("cors");
router.use(cors());

var usersRouter = require("./users/users");
router.use("/users", usersRouter);

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/authorize", function (req, res) {
  let user = req.body.user;
  let token = user.token;
  // invalid token - synchronous
  try {
    var decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return res.status(200).send(true);
  } catch (err) {
    // err
    return res.status(401).send(false);
  }
});

router.post("/token", function (req, res) {
  res.json({});
});

module.exports = router;
