import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Profile";

const LoggedIn = () => {
  return (
      <>
        
      <div className="header-section-in-app d-flex">
        <h2 className="align-content-center ms-4">NAME</h2>
      </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<h1>Dashboard</h1>} />
            <Route path="profile/:username/*" element={<Profile />} />
          </Routes>
        </div>
      </>
  );
}

export default LoggedIn;
