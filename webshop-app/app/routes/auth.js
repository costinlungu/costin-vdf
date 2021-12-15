var express = require("express");
var router = express.Router();

/* GET details page. */
router.get("/login", function (req, res, next) {
  // console.log(req.query);
  res.render("login", {
    title: "Login",
    register: req.query.register,
    error: req.query.error,
  });
});
router.post("/login", function (req, res, next) {
  // read username and password
  let username = req.body.username;
  let password = req.body.password;

  // get users from files
  let users = fs.readFileSync("data/users.json", { encoding: "utf8" });
  // console.log(users);

  // check if credentials (username and password match any existing user)
  let loggedInUser = users.find(
    (user) => user.username === username && user.password === password
  );
  if (loggedInUser) {
    // if found => create/save cookie with user session abd redirect to homepage

    res.redirect("/");
  } else {
    // if not found => redirect to login and show error message
    res.redirect("/auth/login?error=true");
  }
});

router.get("/register", function (req, res, next) {
  req.query.register;
  // console.log(req.query);
  res.render("register", {
    title: "Register",
  });
});

router.post("/register", function (req, res, next) {
  console.log(req.body);

  let user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  // TODO: back-end validation!!! necessary
  let isValid = validateUser(user, req.body.confirmPassword);

  // TODO: register new user
  if (isValid) {
    // TODO: read/write users from file
  }

  // // TODO: setare coockie-uri
  // TODO: send back response == redirect to login page
  res.redirect("/auth/login?register=true");
});

function validateUser(user, confirmPassword) {
  let isValid = true;

  if (
    !username.value ||
    username.value.length < 3 ||
    username.value.length > 20
  ) {
    isValid = false;
  }

  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!pattern.test(email.value)) {
    isValid = false;
  }

  if (
    user.password ||
    password.value.length < 3 ||
    password.value.length > 20
  ) {
    isValid = false;
  }

  // const confirmPassword = document.getElementById("confirmPassword");
  if (confirmPassword.value !== password.value) {
    isValid = false;
    password.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">Password do not match</p>'
    );
  }

  return isValid;
}

module.exports = router;
