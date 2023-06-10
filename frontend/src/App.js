import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Routes, Route }  from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}/>

          {/* Inserire le route delle varie interfacce */}

        <Route path="/dashboard" element={<Dashboard />}/>
        
      </Routes>
    </>
  )
}
