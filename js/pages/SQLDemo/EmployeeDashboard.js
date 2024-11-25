import { navigationService } from '../../navigation.js';

export default async function EmployeeDashboard() {
  console.log('Employee Dashboard loading...');

  try {
    const employees = await fetchEmployees();
    const dashboardHtml = renderEmployeeDashboard(employees);

    setTimeout(() => {
      setupEventListeners();
    }, 0);

    return dashboardHtml;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return '<p>Error loading employee data. Please try again later.</p>';
  }
}

async function fetchEmployees() {
  const response = await fetch('/api/sql-demo/employees', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

function renderEmployeeDashboard(employees) {
  let html = `
    <h1>Employee Dashboard</h1>
    <style>
      .employee-table {
        width: 100%;
        border-collapse: collapse;
      }
      .employee-table th, .employee-table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      .employee-table th {
        background-color: #f2f2f2;
      }
      .truncate {
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .show-more {
        cursor: pointer;
        color: blue;
        text-decoration: underline;
      }
      .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.4);
      }
      .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
      }
      .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
      }
    </style>
    <div id="modal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <p id="modal-text"></p>
      </div>
    </div>
  `;

  if (employees.length === 0) {
    html += '<p>No employees found.</p>';
  } else {
    html += `
      <table class="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>SSH Key</th>
            <th>Embarrassing Fact</th>
          </tr>
        </thead>
        <tbody>
    `;
    employees.forEach((emp, index) => {
      html += `
        <tr>
          <td>${emp.id}</td>
          <td>${emp.username}</td>
          <td>
            <div class="truncate">
              ${emp.password ? emp.password.substring(0, 10) + '...' : 'N/A'}
            </div>
            ${emp.password ? `<span class="show-more" data-content="${escapeHtml(emp.password)}" data-index="${index}-password">Show More</span>` : ''}
          </td>
          <td>
            <div class="truncate">
              ${emp.ssh_key ? emp.ssh_key.substring(0, 30) + '...' : 'N/A'}
            </div>
            ${emp.ssh_key ? `<span class="show-more" data-content="${escapeHtml(emp.ssh_key)}" data-index="${index}-ssh">Show More</span>` : ''}
          </td>
          <td>
            <div class="truncate">
              ${emp.embarrassing_fact ? emp.embarrassing_fact.substring(0, 30) + '...' : 'N/A'}
            </div>
            ${emp.embarrassing_fact ? `<span class="show-more" data-content="${escapeHtml(emp.embarrassing_fact)}" data-index="${index}-fact">Show More</span>` : ''}
          </td>
        </tr>
      `;
    });
    html += '</tbody></table>';
  }

  return html;
}

function setupEventListeners() {
  const modal = document.getElementById('modal');
  const modalText = document.getElementById('modal-text');
  const closeBtn = document.querySelector('.close');

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('show-more')) {
      modalText.textContent = event.target.dataset.content;
      modal.style.display = 'block';
    }
  });

  closeBtn.onclick = function() {
    modal.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
