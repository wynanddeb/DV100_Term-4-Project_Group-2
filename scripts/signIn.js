// //Sign in form validation 

// document.addEventListener("DOMContentLoaded", function () {
//   const signinFormInput = document.getElementById("signinForm");
//   const username1Input = document.getElementById("username1");
//   const password1Input = document.getElementById("password1");
//   const submit = document.getElementById("submit");

//   submit.addEventListener("submit", function (event) {
//     event.preventDefault();
//     const username1 = username1Input.value;
//     const password1 = password1Input.value;

//     const userData = JSON.parse(localStorage.getItem("signinForm")) || [];

//     const user = signinForm.find((signinForm) => signinForm.username1 === username1 && signinForm.password1 === password1);

//     if (user) {
//       localStorage.setItem("isSignedIn", "true");

//       window.location.href = "index.html";
//     } else {
//       alert("Invalid email or password.");
//     }
//   });

//   if (localStorage.getItem("isSignedIn") === "true") {

//     window.location.href = "index.html";
//   }
// });

// //sign up form validation 

// document.addEventListener("DOMContentLoaded", function () {
//   const signupForm = document.querySelector("signupForm");

//   submit.addEventListener("submit", function (event) {
//       event.preventDefault();

//       const usernameInput = document.querySelector("input[name='Username']");
//       const emailInput = document.querySelector("input[name='email']");
//       const passwordInput = document.querySelector("input[name='password']");
//       const password2Input = document.querySelector("input[name='password2']");

//       const username = usernameInput.value;
//       const email = emailInput.value;
//       const password = passwordInput.value;
//       const password2 = password2Input.value;

//       if (username.trim() === "" || email.trim() === "" || password.trim() === "" || password2.trim() === "") {
//           alert("Please fill in all the required fields");
//           return;
//       }

//       if (password !== password2) {
//           alert("Passwords are not the same");
//           return;
//       }

//       window.location.href = "index.html";
//   });
// });

let userData = []

saveUserData = () => {

  let username = document.getElementById('username').value;
  let userEmail = document.getElementById('email').value;
  let userPassword = document.getElementById('password').value;

  userData.push({
    username: username,
    userEmail: userEmail,
    userPassword: userPassword // Fix the variable name here
  });

  console.log(userData);
  document.getElementById("signinForm").reset(); // Fix the form id here
}

checkOut = () => {
  let data = JSON.stringify(userData);
  localStorage.setItem('order', data);
  window.location.href = 'index.html'
}