var signNameInput = document.getElementById("signName");
var signEmailInput = document.getElementById("signEmail");
var signPassInput = document.getElementById("signPass");
var logEmailInput = document.getElementById("logEmail");
var logPassInput = document.getElementById("logPass");
var signUpBtn = document.getElementById("signUpBtn");
var accContainer = [];
var currentUser;
var useName;
var loginBtn = document.getElementById("loginBtn");
if (!localStorage.getItem("account")) {
  accContainer = [];
  console.log("No data found!")
} else {
  console.log("Found data");
  accContainer = JSON.parse(localStorage.getItem("account"));
}
console.log(accContainer);
// Registration
function signUp() {
  if (existingEmail() === true) return;
  var account = {
    signName: signNameInput.value,
    signEmail: signEmailInput.value,
    signPass: signPassInput.value,
  };
  accContainer.push(account);
  localStorage.setItem("account", JSON.stringify(accContainer));
  // useName = account.signName;
  console.log(useName);
  // signUpBtn.setAttribute("href", "index.html");
  setTimeout(() => {
    window.location.href = "https://github.com/za8loul/Smart-login.git/index.html";
  }, 1500);
}
function validateEmail() {
  var regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  if (regex.test(signEmail.value) == true) {
    signEmail.classList.add("is-valid");
    signEmail.classList.remove("is-invalid");
    document.getElementById("validEmail").innerHTML = null;
    return true;
  } else {
    signEmail.classList.add("is-invalid");
    signEmail.classList.remove("is-valid");
    document.getElementById("validEmail").innerHTML = `Invalid email!`;
    return false;
  }
}
function validatePassword() {
  var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  if (regex.test(signPass.value) == true) {
    signPass.classList.add("is-valid");
    signPass.classList.remove("is-invalid");
    document.getElementById("validPass").innerHTML = null;
    return true;
  } else {
    signPass.classList.add("is-invalid");
    signPass.classList.remove("is-valid");
    document.getElementById(
      "validPass"
    ).innerHTML = `Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character!`;
    return false;
  }
}

function existingEmail() {
  console.log(logEmailInput.value);
  for (var i = 0; i < accContainer.length; i++) {
    if (signEmailInput.value == accContainer[i].signEmail) {
      signEmail.classList.add("is-invalid");
      signEmail.classList.remove("is-valid");
      document.getElementById("validEmail").innerHTML = `Email already exists!`;
      return true;
    } else {
      signEmail.classList.add("is-valid");
      signEmail.classList.remove("is-invalid");
      document.getElementById("validEmail").innerHTML = null;
      return false;
    }
  }
}

//*********************************//
// Login
// ********************************//

function logIn() {
  if (logEmailInput.value == "" || logPassInput.value == "") {
    document.getElementById("empty").innerHTML = "All inputs are required";
    document.getElementById("correct").innerHTML = ``;
    document.getElementById("incorrect").innerHTML = ``;
    return false;
  }
  for (var i = 0; i < accContainer.length; i++) {
    if (
      logEmailInput.value === accContainer[i].signEmail &&
      logPassInput.value === accContainer[i].signPass
    ) {
      localStorage.setItem("currentUser", accContainer[i].signName);
      document.getElementById("empty").innerHTML = "";
      document.getElementById("correct").innerHTML = `success!`;
      document.getElementById("incorrect").innerHTML = ``;
      loginBtn.setAttribute("href", "welcome.html");
      console.log(useName);
      return true;
    } else {
      document.getElementById("empty").innerHTML = "";
      document.getElementById("correct").innerHTML = ``;
      document.getElementById(
        "incorrect"
      ).innerHTML = `incorrect email or password!`;
      console.log("incorrect input");
      return false;
    }
  }
}

//*********************************//
// Welcome
// ********************************//
function displayWelcome() {
  document.getElementById("userName").innerHTML = "Welcome " + useName;
}
//*********************************//
// Logout
// ********************************//

function logOut() {
  localStorage.removeItem("currentUser");
  window.open("index.html", "_blank");
}
