var express = require("express");
var router = express.Router();

/* GET details page. */
router.get("/", function (req, res, next) {
  console.log(req.query);
  res.render("register", {
    title: "Register",
  });
});

module.exports = router;
