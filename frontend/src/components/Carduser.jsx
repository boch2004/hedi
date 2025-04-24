import React from 'react';
import "./Carduser.css"; // Fichier CSS pour le style
import { useDispatch } from 'react-redux';
import { deleteuser } from '../JS/userSlice/userSlice';

function Carduser({ user }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      dispatch(deleteuser(id));
    }
  };

  return (
    <div className="user-list-container">
      <ul className="user-list">
        <li key={user.id} className="user-item">
          <span style={{ width: 200 }}>{user.name}</span>
          <span style={{ width: 100 }}>{user.lastname}</span>
          <span style={{ width: 200 }}>{user.email}</span>
          <span style={{ width: 100 }}>{user.phone}</span>
          <span style={{ width: 200 }}>{user.location}</span>
          <span style={{ width: 50 }}>
            <button
              style={{ background: "red", color: "white",border:"none",borderRadius:5 }}
              onClick={() => handleDelete(user._id)} // ✅ Corrected here
            >
              X
            </button>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Carduser;
