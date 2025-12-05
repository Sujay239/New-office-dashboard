// import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import UserLayout from './layouts/UserLayout';
import Dashboard from './pages/users/Dashboard';

const Approutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/user' element={<UserLayout />} >
        <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Approutes;
