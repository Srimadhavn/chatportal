document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));  // Store user object in localStorage

        if (user.role === 'student') {
          window.location.href = 'student-dashboard.html'; // Redirect to student dashboard
        } else if (user.role === 'teacher') {
          window.location.href = 'teacher-dashboard.html'; // Redirect to teacher dashboard
        }
      } else {
        const errorMessage = await response.text();
        document.getElementById('error-message').innerText = errorMessage;
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('error-message').innerText = 'An unexpected error occurred. Please try again.';
    }
  });
});
