import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userRegister } from "../JS/userSlice/userSlice";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Register() {
  const [register, setRegister] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !register.name ||
      !register.lastname ||
      !register.email ||
      !register.password
    ) {
      alert("Please fill in all fields");
      return;
    }
    dispatch(userRegister(register));
    navigate("/profil");
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <h2 className="login-title">Please Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="login-input"
            placeholder="First Name"
            required
            onChange={(e) => setRegister({ ...register, name: e.target.value })}
          />
          <input
            type="text"
            className="login-input"
            placeholder="Last Name"
            required
            onChange={(e) =>
              setRegister({ ...register, lastname: e.target.value })
            }
          />
          <input
            type="email"
            className="login-input"
            placeholder="Email Address"
            required
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            required
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />

          <button className="login-button" type="submit">
            Register
          </button>
        </form>

        <p className="login-register">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
