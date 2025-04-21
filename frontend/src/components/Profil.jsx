import React, { useState, useEffect } from "react";
import { FaBell, FaHeart, FaStar, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./UserProfile.css";
import "./Footer.css";
import { deleteuser, edituser, logout } from "../JS/userSlice/userSlice";
import { NavLink } from "react-router-dom";


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

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteuser(user._id));
        Swal.fire("Deleted!", "Your account has been deleted.", "success");
        navigate("/login");
      }
    });
  };

  const handleSaveChanges = () => {
    dispatch(edituser({ id: user._id, edited }));
  };

  return (
    <div className="user-profile">
      {/* Sidebar */}
      <div className="sidebar">
        <ul className="nav-list">
  <li className="nav-item">
    <NavLink
      style={{ marginTop: 60 }} 
      to="info"
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      <FaBell className="icon" /> <h6>User info</h6>
    </NavLink>
  </li>

  {user?.category === "admin" && (
    <li className="nav-item">
      <NavLink
        to="Les_utlisateurs"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <FaHeart className="icon" /> <h6>Les utilisateurs</h6>
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
                <FaHeart className="icon" /> <h6>Les animaux</h6>
      </NavLink>
    </li>
  )}
   {user?.category === "admin" && (
    <li className="nav-item">
      <NavLink
                to="Histoiress"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
                <FaHeart className="icon" /> <h6>Histoires</h6>
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
      <FaStar className="icon" /> <h6>Mes_animaux</h6>
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

  <li className="nav-item">
    <NavLink
      to=""
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      <FaCog className="icon" /> <h6>Settings</h6>
    </NavLink>
  </li>

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
