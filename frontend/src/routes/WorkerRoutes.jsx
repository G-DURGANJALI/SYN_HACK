// src/components/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import WorkerDashboard from '../pages/workers/WorkerDashboard';
import WorkerLogin from '../pages/workers/WorkerLogin';
import WorkerRegister from '../pages/workers/WorkerRegister';

const WorkerRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<WorkerLogin />} />
      <Route path="register" element={<WorkerRegister />} />
      <Route path="dashboard" element={<WorkerDashboard />} />
    </Routes>
  );
};

export default WorkerRoutes;