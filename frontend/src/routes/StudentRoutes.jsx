// src/components/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentLogin from '../pages/student/StudentLogin';
import StudentRegister from '../pages/student/StudentRegister';
import StudentDashboard from '../pages/student/StudentDashboard';

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<StudentLogin />} />
      <Route path="register" element={<StudentRegister />} />
      <Route path="dashboard" element={<StudentDashboard />} />
    </Routes>
  );
};

export default StudentRoutes;