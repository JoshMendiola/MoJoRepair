import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Login';
import SecureDashboard from '../pages/SecureDashboard';
import SQLDemoHome from '../pages/SQLDemo/Home';
import VulnerableLogin from '../pages/SQLDemo/VulnerableLogin';
import EmployeeDashboard from '../pages/SQLDemo/EmployeeDashboard';
import Services from '../pages/SQLDemo/servicesLoader';
import XSSDemoHome from "../pages/XSSDemo/Home";
import VulnerableMessageBoard from "../pages/XSSDemo/VulnerableMessageBoard";
import FUDemoHome from "../pages/FUDemo/Home";
import VulnerableFileUpload from "../pages/FUDemo/VulnerableFileUpload";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <SecureDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/sql-demo" element={<SQLDemoHome />} />
      <Route path="/sql-demo/services" element={<Services />} />
      <Route path="/sql-demo/admin" element={<VulnerableLogin />} />
      <Route path="/sql-demo/employee-dashboard" element={<EmployeeDashboard />} />
      <Route path="/xss-demo" element={<XSSDemoHome />} />
      <Route path="/xss-demo/message-board" element={<VulnerableMessageBoard />} />
      <Route path="/fu-demo" element={<FUDemoHome />} />
      <Route path="/fu-demo/upload" element={<VulnerableFileUpload />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
