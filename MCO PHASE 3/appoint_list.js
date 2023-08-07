document.addEventListener('DOMContentLoaded', async function () {
    const appointmentsTable = document.getElementById('appointments-table');
    
    const apiURL = 'http://localhost:3000'
    
    try {
      const response = await fetch(apiURL + '/appointments');
      const appointments = await response.json();
  
      appointments.forEach(appointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${appointment.date}</td>
          <td>${appointment.time}</td>
          <td>${appointment.name}</td>
          <td>${appointment.email}</td>
          <td>${appointment.phone}</td>
        `;
        appointmentsTable.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      alert('An error occurred. Please try again later.');
    }
  });