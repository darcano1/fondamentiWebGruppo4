import "./App.css"
import '../src/'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Routes, Route }  from 'react-router-dom';
import Login from './pages/Login';
import Chats from './pages/Chats';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}/>

          {/* Inserire le route delle varie interfacce */}
        <Route path="/chats" element={<Chats />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        
      </Routes>
    </div>
  )
}
