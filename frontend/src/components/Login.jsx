import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userlogin } from "../JS/userSlice/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!login.email || !login.password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
  
    const result = await dispatch(userlogin(login));
  
    if (result.payload && !result.error) {
      const userRole = result.payload.user?.category;

      if (userRole === "admin") {
        navigate("/profil");
      } else {
        navigate("/");
      }
    } else {
      setErrorMessage(result.payload?.msg || "Login failed! Please try again.");
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <h2 className="login-title">Please Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="login-input"
            placeholder="Email Address"
            required
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              className="login-input"
              placeholder="Password"
              required
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
            <span
              className="eye-icon"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

          </div>
          <label className="login-checkbox">
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <p className="login-register">
          Don't have an account? <Link to="/register">Register now</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
