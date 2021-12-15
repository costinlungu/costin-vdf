form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid = validateRegisterForm(); // Front-End validation

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
  if (!username.value) {
    isValid = false;
    username.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">Username is not valid</p>'
    );
  } else if (username.value.length < 3 || username.value.length > 20) {
    isValid = false;
    username.parentElement.insertAdjacentElement(
      "beforeend",
      '<p class="error">Username is not valid</p>'
    );
  }

  const email = document.getElementById("email");
  removeAddInfiniteChildsOnSubmit(email.parentElement);
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!pattern.test(email.value)) {
    email.parentElement.insertAdjacentElement(
      "beforeend",
      '<p class="error">Email is not valid</p>'
    );
  }

  const password = document.getElementById("password");
  removeAddInfiniteChildsOnSubmit(password.parentElement);
  if (password.value.length <= 6 || password.value.length >= 20) {
    isValid = false;
    password.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">Password must be between 6 an 20</p>'
    );
  }

  const confirmPassword = document.getElementById("confirmPassword");
  if (confirmPassword.value !== password.value) {
    isValid = false;
    password.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">Password do not match</p>'
    );
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
