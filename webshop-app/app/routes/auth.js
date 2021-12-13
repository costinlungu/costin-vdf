var express = require("express");
var router = express.Router();

/* GET details page. */
router.get("/register", function (req, res, next) {
  console.log(req.query);
  res.render("register", {
    title: "Register",
  });
});

router.get("/login", function (req, res, next) {
  console.log(req.query);
  res.render("login", {
    title: "Login",
  });
});

module.exports = router;
