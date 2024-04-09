import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./index.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = () => {
    // TODO
    // 1. check that username is not taken (handle in backend)
    // 2. check that password === cPassword (handle here)
    // 3. redirect using navigate from react-router-dom to dashboard/home
    // 4. POST new user to user database, assign username, password (encrypt?), pick a randomized picture 
  }

  return (
    <>
      <div className="header-section-logged-out d-flex">
        <h2 className="align-content-center ms-4">NAME</h2>
      </div>
      <div className="content d-flex bg-login login-bg-image">
        <div className="login-section d-flex flex-column flex-grow-1 opacity-100">
          <h1 className="text-center mb-4">Sign in</h1>
          <label htmlFor="username-input" className="form-label">
            Username
          </label>
          <input
            id="username-input"
            type="text"
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label
            htmlFor="password-input"
            className="form-label mt-3"
          >
            Password
          </label>
          <div className="password-form">
            <input
              id="password-input"
              type={showPassword ? "text" : "password"}
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FaEyeSlash
                className="eye-icon"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                className="eye-icon"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <button className="btn btn-light ms-auto me-0 mt-4" onClick={submitHandler}>Submit</button>

          <span className="text-white mt-5 text-center">Don't have an account? <Link to="/register" className="text-white fw-bolder">Sign up</Link></span>
        </div>
      </div>
    </>
  );
};

export default Login;
