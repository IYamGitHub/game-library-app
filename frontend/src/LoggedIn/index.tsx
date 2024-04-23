import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Profile from './Profile';
import Nav from '../Components/Nav/nav';
import FollowersList from './FollowersList/followerPanel';
import './index.css';
import Dashboard from '../Dashboard/dashboard';

const LoggedIn = () => {
  const [navRefresh, setNavRefresh] = useState(false);
  const refreshNav = () => {
    setNavRefresh(!navRefresh);
  };

  return (
    <div className="d-flex h-100">
      <div className="h-100 page">
        <Nav showNav={true} />
        <div className="content bg-content">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard/:username" />} />
            <Route path="dashboard/:username" element={<Dashboard/>} />
            <Route path="profile/:username" element={<Profile onRefresh={refreshNav}/>} />
            <Route path="games/:username" element={<h3>Games</h3>} />
          </Routes>
        </div>
      </div>
      <FollowersList refresh={navRefresh} />
    </div>
  );
};

export default LoggedIn;
