// src/components/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HostelAdminDashboard from '../pages/hostelAdmin/hostelAdminDashboard';


const HostelAdminRoutes = () => {
  return (
    <Routes>
      
      <Route path="dashboard" element={<HostelAdminDashboard />} />
    </Routes>
  );
};

export default HostelAdminRoutes;