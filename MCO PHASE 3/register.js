
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', async function (event) {
      event.preventDefault();
  

      const profilePicture = document.getElementById('profilePicture').files[0];
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('password-confirm').value;
      const birthday = document.getElementById('birthday').value;
      const sex = document.getElementById('sex').value;
      const accountType = document.getElementById('account').value;
      const bloodType = document.getElementById('blood-type').value;
      const disabilities = document.getElementById('disabilities').value;

      const apiURL = 'http://localhost:3000'
  
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
  

      try {
        const emailCheckResponse = await fetch(apiURL + '/check-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
  
        const emailCheckData = await emailCheckResponse.json();
  
        if (emailCheckData.exists) {
          alert('An account with this email address already exists.');
          return;
        }
      } catch (error) {
        console.error('Error checking email:', error);
        alert('An error occurred. Please try again later.');
        return;
      }
  

      const formData = new FormData();
      formData.append('profilePicture', profilePicture);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('birthday', birthday);
      formData.append('sex', sex);
      formData.append('accountType', accountType);
      formData.append('bloodType', bloodType);
      formData.append('disabilities', disabilities);
  
      try {
        const response = await fetch(apiURL + '/register-account', {
            method: 'POST',
            body: formData,
          });
  
        const data = await response.json();
  
        if (data.success) {
          alert('Account created successfully!');
          window.location.href = '/Login Page.html'; 
        } else {
          alert('Account creation failed. Please try again.');
        }
      } catch (error) {
        console.error('Error creating account:', error);
        alert('An error occurred. Please try again later.');
      }
    });
  });