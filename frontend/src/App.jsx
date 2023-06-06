import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Routes, Route }  from 'react-router-dom';
import Login from './pages/Login.jsx';
import Chats from './pages/Chats.jsx';
import Dashboard from './pages/Dashboard.jsx';
import FriendRequest from './pages/FriendRequest.jsx'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}/>
          {/* Inserire le route delle varie interfacce */}
        <Route path="/chats" element={<Chats />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/friendRequest" element={<FriendRequest />}/> */}
      </Routes>
    </div>
  )
}
