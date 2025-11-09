// src/components/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentLogin from '../pages/student/StudentLogin';
import StudentRegister from '../pages/student/StudentRegister';
import StudentDashboard from '../pages/student/StudentDashboard';
import DisplayComplaint from '../pages/student/DisplayComplaint';
import SurveyForm from '../pages/student/SurveyForm';
import ComplaintForm from '../pages/student/ComplaintForm';

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<StudentLogin />} />
      <Route path="register" element={<StudentRegister />} />
      <Route path="dashboard" element={<StudentDashboard />} />
      <Route path="complaint" element={<DisplayComplaint />} />
      <Route path="survey" element={<SurveyForm />} />
      <Route path="complaintform" element={<ComplaintForm />} />
    </Routes>
  );
};

export default StudentRoutes;