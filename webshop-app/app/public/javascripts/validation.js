form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid = validateRegisterForm();

  const form = document.getElementById("form");
  const errorElement = document.getElementById("error");

  if (isValid) {
    // TODO: submit form
  }
});

function validateRegisterForm() {
  let isValid = true;

  const username = document.getElementById("username");
  removeAddInfiniteChildsOnSubmitBtnError(username.parentElement);
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
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  if (password.value.length <= 6 || password.value.length >= 20) {
    // TODO:
  }
  if (confirmPassword.value !== password.value) {
    // TODO:
  }
  return isValid;
}

function removeAddInfiniteChildsOnSubmitBtnError(parent) {
  const errors = parent.getElementsByClassName("error");

  if (errors.length > 0) {
    for (let errorChild of errors) {
      parent.removeChild(errorChild);
    }
  }
}
