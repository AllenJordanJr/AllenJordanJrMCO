function getLoggedInUserEmail() {
    const userEmail = document.cookie
      .split('; ')
      .find(row => row.startsWith('userEmail='))
      ?.split('=')[1];
    return userEmail || null;
  }

document.addEventListener('DOMContentLoaded', function () {
    const appointmentForm = document.getElementById('appointment-form');
    appointmentForm.addEventListener('submit', async function (event) {
      event.preventDefault();
  
      const phone = document.getElementById('phone').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const message = document.getElementById('message').value;

      const apiURL = 'http://localhost:3000'
      
      const loggedInUserEmail = getLoggedInUserEmail(); 
  
      const appointmentData = {
        email: loggedInUserEmail,
        phone,
        date,
        time,
        message,
      };

      try {
        const response = await fetch(apiURL + '/schedule-appointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(appointmentData),
        });
  
        const data = await response.json();
  
        if (data.success) {
          alert('Appointment scheduled successfully!');
        } else {
          alert('Appointment scheduling failed. Please try again.');
        }
      } catch (error) {
        console.error('Error scheduling appointment:', error);
        alert('An error occurred. Please try again later.');
      }
    });
  });