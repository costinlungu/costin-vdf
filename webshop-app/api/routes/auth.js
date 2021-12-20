const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.post("/login", function (req, res, next) {
  console.log(req.body);
  let users = JSON.parse(fs.readFileSync("./users.json", "utf8"));

  let user = users.find(
    (user) =>
      user.email === req.body.email && user.password === req.body.password
  );
  console.log(user);
  res.json(user);
});

router.post("/register", function (req, res) {
  console.log(req.body);

  let user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  if (errors.length > 0) {
    res.status(400);
    res.send("Request not valid");
  }

  let users = JSON.parse(
    fs.readFileSync(path.resolve("__dirname", "../users.json"), "utf8")
  );
  users.push({
    id: users[users.length - 1].id + 1,
    name: "",
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: "user",
    loggedin: false,
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  fs.writeFile(
    path.resolve("__dirname", "../users.json"),
    JSON.stringify(users),
    function (err) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("Operation complete.");
        res.send("Successfully registered");
      }
    }
  );
});

function validateUser(user) {
  let errors = [];

  if (!user.username) {
    errors.push("Username is required");
  } else if (user.username.length < 3 || user.username.length > 256) {
    errors.push("Username must be at least 3 letters and maximum 256");
  }

  return errors;
}

module.exports = router;
