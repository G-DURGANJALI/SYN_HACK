import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import NotFound from './pages/NotFound';



import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
axios.defaults.withCredentials = true;

export default function App() {
 
  return (
    
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>

        

        

        <Route path="*" element={<NotFound />} />

      </Routes>

    </Router>
  );
}