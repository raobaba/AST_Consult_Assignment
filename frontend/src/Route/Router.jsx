import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from '../Pages/Admin';
import Gallery from '../Pages/Gallery';
import LogIn from '../Pages/Login';
import SignUp from '../Pages/SignUp';

export default function Router() {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<Gallery />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}
