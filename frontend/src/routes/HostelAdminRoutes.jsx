// src/components/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HostelAdminDashboard from '../pages/hostelAdmin/hostelAdminDashboard';
import HostelAdminLogin from '../pages/hostelAdmin/AdminLogin';
import HostelAdminRegister from '../pages/hostelAdmin/AdminRegister';	


const HostelAdminRoutes = () => {
  return (
    <Routes>
      
      <Route path="dashboard" element={<HostelAdminDashboard />} />
	  <Route path="login" element={<HostelAdminLogin />} />
	  <Route path="register" element={<HostelAdminRegister />} />

    </Routes>
  );
};

export default HostelAdminRoutes;