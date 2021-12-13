const path = require("path");
const fs = require("fs");
var express = require("express");
var router = express.Router();

let products = fs.readFileSync("./products.json", "utf8");
let parsedProducts = JSON.parse(products);

/* GET details page. */
router.get("/", function (req, res, next) {
  res.json(parsedProducts);
});

module.exports = router;
