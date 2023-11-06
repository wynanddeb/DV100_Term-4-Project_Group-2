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
