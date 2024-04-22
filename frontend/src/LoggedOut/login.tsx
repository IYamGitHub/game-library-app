import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../Components/Nav/nav";
import * as client from "../Users/client";
import { User } from "../Users/client";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<User>({ _id: "",
    username: "", password: "", displayname: "", avatar: "", bio: "",
    riotid: "", steamid: "", following: [], likes: [],});

  const navigate = useNavigate();
  const signin = async () => {
    try {
      await client.signin(credentials);
      navigate(`/gla/dashboard/${credentials.username}`);
    } catch (err) {
        alert("Login credentials are invalid.");
    }
  };
  return (
    <div className="h-100 bg-gla-medium-blue">
      <Nav showNav={false} />
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
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
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
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
          <button className="btn btn-light ms-auto me-0 mt-4" onClick={signin}>Submit</button>

          <span className="text-white mt-5 text-center">Don't have an account? <Link to="/register" className="text-white fw-bolder">Sign up</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
