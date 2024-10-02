import { isAuthenticated } from '../auth.js';
import { navigationService } from '../navigation.js';

export default async function EmployeeDashboard() {
  console.log('Employee Dashboard loading...');

  if (!isAuthenticated()) {
    navigationService.navigate('/login');
    return '<p>Please log in to view this page.</p>';
  }

  try {
    const employees = await fetchEmployees();
    return renderEmployeeDashboard(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return '<p>Error loading employee data. Please try again later.</p>';
  }
}

async function fetchEmployees() {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch('/api/employees', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token might be expired
      localStorage.removeItem('token');
      navigationService.navigate('/login');
      throw new Error('Session expired. Please log in again.');
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// ... rest of the file remains the same
