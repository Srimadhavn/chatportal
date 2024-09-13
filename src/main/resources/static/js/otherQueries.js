// Function to update the queries section
function updateOtherQueries(queries) {
    const allQueriesDiv = document.getElementById('allQueries');
    if (!allQueriesDiv) {
        console.error('Element with ID "allQueries" not found.');
        return;
    }
    allQueriesDiv.innerHTML = '';

    queries.forEach((query) => {
        const queryItem = document.createElement('div');
        queryItem.className = 'query-item';
        queryItem.innerHTML = `<strong>${query.subjectCode}:</strong> ${query.content} <br><em>${formatDateTime(query.timestamp)}</em>`;
        allQueriesDiv.appendChild(queryItem);
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

// Function to load queries from backend
function loadOtherQueries() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        fetch(`/api/other-queries?username=${encodeURIComponent(user.username)}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((queries) => {
                updateOtherQueries(queries);
            })
            .catch((error) => console.error('Error loading queries:', error));
    } else {
        alert('User not logged in.');
    }
}

// Add event listeners after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    loadOtherQueries();
});
