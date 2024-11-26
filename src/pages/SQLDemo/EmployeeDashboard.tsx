import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal/Modal';
import '../../../css/EmployeeDashboard.css';

interface Employee {
  id: number;
  username: string;
  password: string;
  ssh_key: string;
  embarrassing_fact: string;
}

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/sql-demo/employees', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError('Error loading employee data');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="employee-dashboard">
      <h1>Employee Dashboard</h1>
      
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table className="employee-table">
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
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.username}</td>
                <td>
                  <div className="truncate">
                    {emp.password ? `${emp.password.substring(0, 10)}...` : 'N/A'}
                  </div>
                  {emp.password && (
                    <button 
                      className="show-more"
                      onClick={() => handleShowMore(emp.password)}
                    >
                      Show More
                    </button>
                  )}
                </td>
                <td>
                  <div className="truncate">
                    {emp.ssh_key ? `${emp.ssh_key.substring(0, 30)}...` : 'N/A'}
                  </div>
                  {emp.ssh_key && (
                    <button 
                      className="show-more"
                      onClick={() => handleShowMore(emp.ssh_key)}
                    >
                      Show More
                    </button>
                  )}
                </td>
                <td>
                  <div className="truncate">
                    {emp.embarrassing_fact 
                      ? `${emp.embarrassing_fact.substring(0, 30)}...` 
                      : 'N/A'}
                  </div>
                  {emp.embarrassing_fact && (
                    <button 
                      className="show-more"
                      onClick={() => handleShowMore(emp.embarrassing_fact)}
                    >
                      Show More
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      >
        <p>{modalContent}</p>
      </Modal>
    </div>
  );
};

export default EmployeeDashboard;