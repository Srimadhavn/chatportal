// Function to update the queries section
function updateAllQueries(queries) {
    const queriesDiv = document.getElementById('allQueries');
    queriesDiv.innerHTML = '';

    queries.forEach((query) => {
      const queryItem = document.createElement('div');
      queryItem.className = 'query-item';
      queryItem.innerHTML = `<strong>${query.subjectCode}:</strong> ${query.content} <br><em>${formatDateTime(query.timestamp)}</em>`;
      queriesDiv.appendChild(queryItem);
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

// Function to load all queries from backend
function loadAllQueries() {
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
                // Display all queries
                updateAllQueries(queries);
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

// Add event listeners after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    loadAllQueries();

    // Add logout button event listener
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logoutUser);
    }
});
