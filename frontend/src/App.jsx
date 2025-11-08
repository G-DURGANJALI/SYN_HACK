import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import NotFound from './pages/NotFound';
import StudentRoutes from './routes/StudentRoutes';
import HostelAdminRoutes from './routes/HostelAdminRoutes'; 
import WorkerRoutes from './routes/WorkerRoutes';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
axios.defaults.withCredentials = true;

export default function App() {
 
  return (
    
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="hostel-admin/*" element={<HostelAdminRoutes />} />
        <Route path="students/*" element={<StudentRoutes />} />
        <Route path="workers/*" element={<WorkerRoutes />} />
        <Route path="*" element={<NotFound />} />

      </Routes>

    </Router>
  );
}