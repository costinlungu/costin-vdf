var express = require("express");
var router = express.Router();

/* GET details page. */
router.get("/", function (req, res, next) {
  console.log(req.query);
  // TODO
  // get phones array
  // filter phones array by query params
  // get filters array
  // set selected filters from query
  // send phones and filters to render method

  res.render("details", {
    title: "Details",
  });
});

module.exports = router;
