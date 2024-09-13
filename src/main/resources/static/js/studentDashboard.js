// Function to submit query to the backend
function submitQuery(subject, content) {
  const user = JSON.parse(localStorage.getItem('user'));  // Get the user object

  if (!user || user.role !== 'student') {
    alert('User not logged in.');
    return;
  }

  fetch(`/api/queries?username=${encodeURIComponent(user.username)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: user.username,
      subjectCode: subject,
      content: content,
      timestamp: new Date().toISOString(),
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        loadRecentQueries();
        document.getElementById('queryInput').value = '';
      } else {
        alert('Error submitting query.');
      }
    })
    .catch((error) => {
      console.error('Error during query submission:', error);
    });
}

// Function to update the recent queries section
function updateRecentQueries(queries) {
  const recentQueriesDiv = document.getElementById('recentQueries');
  recentQueriesDiv.innerHTML = '';

  queries.forEach((query) => {
    const queryItem = document.createElement('div');
    queryItem.className = 'query-item';
    queryItem.innerHTML = `<strong>${query.subjectCode}:</strong> ${query.content} <br><em>${formatDateTime(query.timestamp)}</em>`;
    recentQueriesDiv.appendChild(queryItem);
  });
}

// Function to format the date and time
function formatDateTime(timestamp) {
  const date = new Date(timestamp);
  const options = { day: '2-digit', month: '2-digit' };
  const dateString = date.toLocaleDateString(undefined, options);
  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${dateString} ${timeString}`;
}

// Function to load recent queries from backend
function loadRecentQueries() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    fetch(`/api/queries?username=${encodeURIComponent(user.username)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((queries) => {
        // Display only the recent 5 queries
        updateRecentQueries(queries.slice(-5).reverse());
      })
      .catch((error) => console.error('Error loading queries:', error));
  } else {
    alert('User not logged in.');
  }
}

// Function to handle user logout
function logoutUser() {
  localStorage.removeItem('user');
  window.location.href = 'login.html';  // Redirect to login page
}

// Function to update the profile section
function updateProfileSection() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    const welcomeHeader = document.getElementById('welcomeHeader');
    welcomeHeader.textContent = `Welcome ${user.username}!`;

    document.getElementById('logoutButton').addEventListener('click', logoutUser);
  } else {
    window.location.href = 'login.html';  // Redirect to login if user not found
  }
}

// Add event listeners after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Update profile section
  updateProfileSection();

  const submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', function () {
    const subjectSelect = document.getElementById('subjectSelect').value;
    const queryInput = document.getElementById('queryInput').value.trim();

    if (queryInput) {
      submitQuery(subjectSelect, queryInput);
    } else {
      alert('Please enter a query before submitting.');
    }
  });

  loadRecentQueries();
});
