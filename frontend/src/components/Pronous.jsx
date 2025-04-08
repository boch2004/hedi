import React, { useState } from "react";
import "./Pronous.css"; // Vérifie que ce fichier est bien au bon endroit

function Pronous() {
  const [showMission, setShowMission] = useState(false);
  const [showVision, setShowVision] = useState(false);
  const [showContact, setShowContact] = useState(false); // Ajout de l'état pour afficher/masquer les informations de contact

  return (
    <div className="about-container">
      <div className="about-content">
        {/* Image illustrative */}
        <div className="about-image">
          <img src="/nous.jpg" alt="Animaux adoptés" />
        </div>

        {/* Contenu texte */}
        <div className="about-text">
          <h1 className="title">Notre plateforme d'adoption d'animaux</h1>
          <p className="description">
            Nous nous engageons à faciliter l’adoption des animaux en offrant
            une plateforme intuitive et bienveillante.
          </p>

          {/* Onglets Mission / Vision */}
          <div className="about-tabs">
            <button
              className={showMission ? "active" : ""}
              onClick={() => setShowMission(!showMission)}
            >
              {showMission ? "Masquer la Mission" : "Afficher la Mission"}
            </button>
            {showMission && (
              <p className="mission">
                Notre mission est de faciliter l'adoption d'animaux.
              </p>
            )}

            <button
              className={showVision ? "active" : ""}
              onClick={() => setShowVision(!showVision)}
            >
              {showVision ? "Masquer la Vision" : "Afficher la Vision"}
            </button>
            {showVision && (
              <p className="mission">
                Notre vision est de créer un monde sans animaux abandonnés.
              </p>
            )}

            {/* Nouveau bouton "Nous Contacter" */}
            <button
              className={showContact ? "active" : ""}
              onClick={() => setShowContact(!showContact)}
            >
              {showContact ? "Masquer les Coordonnées" : "Nous Contacter"}
            </button>
            {showContact && (
              <div className="contact-info">
                <p>
                  <strong>Téléphone:</strong> +216 25 252 252
                </p>
                <p>
                  <strong>Email:</strong> adoptme@gmail.com
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pronous