import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import Login from './LoggedOut/login';
import Register from './LoggedOut/register';
import LoggedIn from './LoggedIn';
import Dashboard from './Dashboard/dashboard';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/"             element={<Navigate to="/register"/>}/>
        <Route path="/dashboard"    element={<Dashboard/>}/>
        <Route path="/login/*"      element={<Login/>}/>
        <Route path="/register/*"   element={<Register />}/>
        <Route path="/gla/*"        element={<LoggedIn />}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
