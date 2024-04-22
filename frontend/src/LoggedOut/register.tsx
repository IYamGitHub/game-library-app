import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaExclamationTriangle } from "react-icons/fa";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../Components/Nav/nav";
import * as client from "../Users/client";
import { AVATARS } from "../LoggedIn/Profile";

const getRandomElement = (arr: any[]) =>
  arr.length ? arr[Math.floor(Math.random() * arr.length)] : undefined


const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState({ username: "", password: "", avatar: getRandomElement(AVATARS) });
  const [cPassword, setCPassword] = useState<string>("");

  const navigate = useNavigate();
  const signup = async () => {
    try {
      if (!user.username) {
        setError("Username field cannot be empty.");
      } else if (!user.password) {
        setError("Please enter a password.");
      } else if (!cPassword) {
        setError("Please confirm password.");
      } else if (user.password !== cPassword) {
        setError("Passwords are different. Please try again.");
      } else {
        await client.signup(user);
        navigate(`/gla/dashboard/${user.username}`);
      }
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="h-100 bg-gla-medium-blue">
      <Nav showNav={false} />
      <div className="content d-flex bg-login register-bg-image">
        <div className="login-section d-flex flex-column flex-grow-1 opacity-100">
          <h1 className={`text-center ${error ? "mb-2" : "mb-4"}`}>Sign up today!</h1>
          {error && (
            <div
              className="alert alert-danger d-flex align-items-center m-0 mb-2"
              role="alert"
            >
              <FaExclamationTriangle className="me-2" />
              {error}
            </div>
          )}
          <label htmlFor="username-input" className="form-label">
            Username
          </label>
          <input
            id="username-input"
            type="text"
            className="form-control"
            onChange={(e) => setUser({...user, username: e.target.value })}
          ></input>
          <label htmlFor="password-input" className="form-label mt-3">
            Password
          </label>
          <div className="password-form">
            <input
              id="password-input"
              type={showPassword ? "text" : "password"}
              className="form-control"
              onChange={(e) => setUser({...user, password: e.target.value })}
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
          <label htmlFor="confirm-password-input" className="form-label mt-3">
            Confirm Password
          </label>
          <div className="password-form">
            <input
              id="confirm-password-input"
              type={showCPassword ? "text" : "password"}
              className="form-control"
              onChange={(e) => setCPassword(e.target.value)}
            />
            {showCPassword ? (
              <FaEyeSlash
                className="eye-icon"
                onClick={() => setShowCPassword(false)}
              />
            ) : (
              <FaEye
                className="eye-icon"
                onClick={() => setShowCPassword(true)}
              />
            )}
          </div>
          <button
            className="btn btn-light ms-auto me-0 mt-4"
            onClick={signup}
          >
            Submit
          </button>

          <span className="text-white mt-5 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-white fw-bolder">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
