import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import StudentRoutes from "./routes/StudentRoutes"
import ClubRoutes from "./routes/ClubRoutes"
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/NotFound';

import StudentProfileSection from './pages/student/StudentProfileSection';
import StudentProfileEditSection from './pages/student/StudentProfileEditSection';
import StudentPasswordEditSection from './pages/student/StudentPasswordEditSection';
import Home from './pages/Home';


import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
axios.defaults.withCredentials = true;

export default function App() {
 
  return (
    
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/student/*" element={<StudentRoutes />} />

        <Route path="/club/*" element={<ClubRoutes/>} />

        <Route path="/admin" element={<AdminDashboard />}/>

        <Route path="/StudentProfileSection" element={<StudentProfileSection />} />
        <Route path="/StudentProfileEditSection" element={<StudentProfileEditSection/>} />
        <Route path="/StudentPasswordEditSection" element={<StudentPasswordEditSection/>} />

        <Route path="*" element={<NotFound />} />

      </Routes>

    </Router>
  );
}