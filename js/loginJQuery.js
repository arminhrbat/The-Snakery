const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', (event) => {
  event.preventDefault(); // prevent the default form submission
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // check if the username and password are valid
  if (username === 'admin' && password === '123456') {
    // redirect the user to the admin.html page
    window.location.href = 'admin.html';
  } else {
    alert('Invalid username or password.');
  }
});