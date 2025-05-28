import React, { useState, useEffect } from "react";
import { FaBell, FaHeart, FaStar, FaCog, FaSignOutAlt, FaPaw, FaUsers, FaBookOpen, FaEnvelopeOpenText } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./UserProfile.css";
import "./Icon.css";
import { deleteuser, edituser, logout } from "../JS/userSlice/userSlice";
import { NavLink } from "react-router-dom";
import { GiScrollUnfurled } from 'react-icons/gi';



const Profil = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [edited, setEdited] = useState({
    name: user?.name || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    password: user?.password || "",
    img: user?.img || "",
  });

  useEffect(() => {
    if (user) {
      setEdited({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        img: user.img,
      });
    }
  }, [user]);

  return (
    <div className="user-profile">
      <div className="sidebar">
        <ul className="nav-list">
          {user?.category === "user" && (
  <li className="nav-item">
    <NavLink
      style={{ marginTop: 60 }} 
      to="info"
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      <FaBell className="icon" /> <h6>Profil</h6>
    </NavLink>
  </li>
          )}

  {user?.category === "admin" && (
    <li  className="nav-item">
      <NavLink
        style={{ marginTop:60 }}
        to="Les_utlisateurs"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
                <FaUsers className="icon" /> <h6>Les utilisateurs</h6>
      </NavLink>
    </li>
  )}
    {user?.category === "admin" && (
    <li className="nav-item">
      <NavLink
                to="Les_animaux"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
                <FaPaw className="icon" /> <h6>Les animaux</h6>
      </NavLink>
    </li>
  )}
          {user?.category === "admin" && (
            <li className="nav-item">
              <NavLink
                to="Lesadoptions"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaPaw className="icon" /> <h6>Les adoptions</h6>
              </NavLink>
            </li>
          )}
   {user?.category === "admin" && (
    <li className="nav-item">
      <NavLink
                to="Expériences"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
                <GiScrollUnfurled className="icon" /> <h6>Expérience</h6>
      </NavLink>
    </li>
  )}
          {user?.category === "user" && (
  <li className="nav-item">
    <NavLink
                to="Mes_animaux"
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      <FaStar className="icon" /> <h6>Mes animaux</h6>
    </NavLink>
  </li>
          )}
          {user?.category === "user" && (
            <li className="nav-item">
              <NavLink
                to="Mes_expériences"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaBookOpen className="icon" /> <h6>Mes expérience</h6>
              </NavLink>
            </li>
    )}
          {user?.category === "user" && (
    <li className="nav-item">
      <NavLink
                to="favorites"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
                <FaHeart className="icon" /> <h6>favorites</h6>
      </NavLink>
    </li>
  )}
          {user?.category === "user" && (
            <li className="nav-item">
              <NavLink
                to="Mes_demandes"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaEnvelopeOpenText className="icon" /> <h6>Mes demandes</h6>
              </NavLink>
            </li>
          )}
  {user?.category === "user" && (
    <li className="nav-item">
      <NavLink
                to="adoptions"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
                <FaPaw className="icon" /> <h6>adoptions</h6>
      </NavLink>
    </li>
  )}


  <li className="nav-item logout">
    <button
      className="logout-button"
      onClick={() => {
        dispatch(logout());
        navigate("/login");
      }}
    >
      <FaSignOutAlt className="icon" /> Log out
    </button>
  </li>
</ul>
      </div>
      <div className="profile-section">
        <Outlet />
      </div>
    </div>
  );
};

export default Profil;
