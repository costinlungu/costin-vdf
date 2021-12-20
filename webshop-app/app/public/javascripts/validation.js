form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid = validateRegisterForm(); // Front-End validation
  console.log(isValid);

  if (isValid) {
    // submit form
    const form = document.getElementById("form");
    form.submit();
  }
});

function validateRegisterForm() {
  let isValid = true;

  const username = document.getElementById("username");
  removeAddInfiniteChildsOnSubmit(username.parentElement);
  const usernameRegex =
    /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g;
  if (
    !username.value ||
    username.value.length < 3 ||
    username.value.length > 20 ||
    !usernameRegex.test(username.value)
  ) {
    isValid = false;
    username.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">Username must be between 3 and 20 characters! Could not contain dots or hyphens at the beginning or end!</p>'
    );
    return;
  }

  const email = document.getElementById("email");
  if (email) {
    removeAddInfiniteChildsOnSubmit(email.parentElement);
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(email.value)) {
      isValid = false;
      email.parentElement.insertAdjacentHTML(
        "beforeend",
        '<p class="error">Email is not valid</p>'
      );
      return;
    }
  }

  const password = document.getElementById("password");
  removeAddInfiniteChildsOnSubmit(password.parentElement);
  const regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (
    !regexPassword.test(password.value) ||
    password.value.length < 6 ||
    password.value.length > 20
  ) {
    isValid = false;
    password.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">Password should contain minimum six characters (at least): \n-one uppercase letter, \n-one lowercase letter, \n-one number and \n-one special character.</p>'
    );
    return;
  }

  const confirmPassword = document.getElementById("confirmPassword");
  if (confirmPassword) {
    removeAddInfiniteChildsOnSubmit(confirmPassword.parentElement);
    if (confirmPassword.value !== password.value) {
      isValid = false;
      confirmPassword.parentElement.insertAdjacentHTML(
        "beforeend",
        '<p class="error">Password do not match</p>'
      );
      return;
    }
  }

  return isValid;
}

function removeAddInfiniteChildsOnSubmit(parent) {
  const errors = parent.getElementsByClassName("error");

  if (errors.length > 0) {
    for (let errorChild of errors) {
      parent.removeChild(errorChild);
    }
  }
}
