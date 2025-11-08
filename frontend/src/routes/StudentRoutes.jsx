// src/components/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentLogin from '../pages/student/StudentLogin';
import StudentRegister from '../pages/student/StudentRegister';
import StudentHome from '../pages/student/StudentHome';

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<StudentLogin />} />
      <Route path="register" element={<StudentRegister />} />
      <Route path="home" element={<StudentHome /> }/>
    </Routes>
  );
};

export default StudentRoutes;