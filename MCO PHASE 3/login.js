document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async function (event) {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const apiURL = 'http://localhost:3000'

      const loginData = {
        email,
        password,
      };
  
      try {
        const response = await fetch(apiURL + '/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
  
        const data = await response.json();
  
        if (data.success) {

          document.cookie = `userEmail=${email}; path=/;`;
          alert('Login successful!');
          window.location.href = '/index.html'; 
        } else {
          alert('Login failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred. Please try again later.');
      }
    });
  });