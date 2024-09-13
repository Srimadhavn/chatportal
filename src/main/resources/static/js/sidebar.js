// sidebar.js
document.addEventListener('DOMContentLoaded', function () {
    const sidebarContainer = document.querySelector('.sidebar');
  
    // Example sidebar content, you can adjust this to match your actual sidebar content
    const sidebarContent = `
        <div class="sidebar-title">Dashboard</div>

      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link" href="student-dashboard.html">Student Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="your-queries.html">Your Queries</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="other-queries.html">Other Queries</a>
        </li>

      </ul>
    `;
  
    sidebarContainer.innerHTML = sidebarContent;
  });
  