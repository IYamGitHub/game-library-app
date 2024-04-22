import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Profile from './Profile';
import Nav from '../Components/Nav/nav';
import FriendsList from './FriendsList/followerPanel';
import "./index.css";

const LoggedIn = () => {
  return (
    <div className='d-flex h-100'>
      <div className='h-100 page'>
        <Nav showNav={true} />
        <div className="content bg-content">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard/:username" />} />
            <Route path="dashboard/:username" element={<h1>Dashboard</h1>} />
            <Route path="profile/:username/*" element={<Profile />} />
            <Route path="games/:username/*" element={<h3>Games</h3>} />
          </Routes>
        </div>
      </div>
      <FriendsList />
    </div>
  );
};

export default LoggedIn;
