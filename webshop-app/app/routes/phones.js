var express = require("express");
var router = express.Router();
const axios = require("axios").default;

/* GET details page. */
router.get("/", function (req, res, next) {
  console.log(req.query);

  axios
    .get("http://localhost:3001/phones", {
      params: req.query,
    })
    .then(function (response) {
      // send phones and filters to render method

      res.render("phones", {
        title: "Phones",
        products: response.data,
      });
    })
    .catch(function (error) {
      // handle error
      res.status(404).send("404 Not Found");
    });
});

module.exports = router;
