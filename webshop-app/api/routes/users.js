const path = require("path");
var express = require("express");
const fs = require("fs");
var router = express.Router();

let rawData = fs.readFileSync(path.resolve(__dirname, "../users.json"));
let users = JSON.parse(rawData);

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log(users);
  res.json(users);
});

module.exports = router;
