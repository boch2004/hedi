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
    postalCode: "",
    location: "",
    phone: "",
  });

  const [ping, setPing] = useState(false); // état utilisé pour rafraîchir si besoin
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifie que tous les champs sont remplis
    const tousChampsRemplis = Object.values(register).every(
      (val) => val.trim() !== ""
    );
    if (!tousChampsRemplis) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    // Vérifie que le numéro de téléphone contient exactement 8 chiffres
    if (!/^\d{8}$/.test(register.phone)) {
      alert("Le numéro de téléphone doit contenir exactement 8 chiffres.");
      return;
    }

    dispatch(userRegister(register));
    navigate("/");
    setPing((prev) => !prev);
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <h2 className="login-title">Créer un compte</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="login-input"
            placeholder="Nom"
            required
            onChange={(e) =>
              setRegister({ ...register, name: e.target.value })
            }
          />
          <input
            type="text"
            className="login-input"
            placeholder="Prénom"
            required
            onChange={(e) =>
              setRegister({ ...register, lastname: e.target.value })
            }
          />
          <input
            type="tel"
            className="login-input"
            placeholder="Téléphone (8 chiffres)"
            required
            maxLength={8}
            value={register.phone}
            onChange={(e) => {
              const value = e.target.value;
              const chiffresSeulement = value.replace(/\D/g, "");
              setRegister({ ...register, phone: chiffresSeulement });
            }}
          />
          <input
            type="email"
            className="login-input"
            placeholder="Adresse e-mail"
            required
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
          />
          <input
            type="text"
            className="login-input"
            placeholder="Ville / Localité"
            required
            onChange={(e) =>
              setRegister({ ...register, location: e.target.value })
            }
          />
          <input
            type="text"
            className="login-input"
            placeholder="Code postal"
            required
            onChange={(e) =>
              setRegister({ ...register, postalCode: e.target.value })
            }
          />
          <input
            type="password"
            className="login-input"
            placeholder="Mot de passe"
            required
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />

          <button className="login-button" type="submit">
            S'inscrire
          </button>
        </form>

        <p className="login-register">
          Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
