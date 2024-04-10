import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Profile";
import Nav from "../Components/Nav/nav";

const LoggedIn = () => {
  return (
    <>
      <Nav showNav={true}/>
      <div className="content bg-content">
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<h1>Dashboard</h1>} />
          <Route path="profile/:username/*" element={<Profile />} />
          <Route path="games/:username/*" element={<h3>Games</h3>} />
        </Routes>
      </div>
    </>
  );
};

export default LoggedIn;
