import React, { useState } from "react";
import "./Conseil.css";

const conseils = [
  {
    id: 1,
    icon: "/shield.svg",
    title: "Sécuriser l’animal",
    text: "Éloignez-le du danger et gardez votre calme.",
  },
  {
    id: 2,
    icon: "/heart.svg",
    title: "Vérifier son état",
    text: "Regardez s'il respire et s'il réagit.",
  },
  {
    id: 3,
    icon: "/band.svg",
    title: "Soigner les blessures",
    text: "Appliquez une compresse sur les plaies ouvertes.",
  },
  {
    id: 4,
    icon: "/wind.svg",
    title: "Vérifier la respiration",
    text: "Regardez si sa poitrine se soulève régulièrement.",
  },
  {
    id: 5,
    icon: "/plus.svg",
    title: "Immobiliser l’animal",
    text: "Évitez qu'il ne bouge pour ne pas aggraver une blessure.",
  },
  {
    id: 6,
    icon: "/stethoscope.svg",
    title: "Consulter un vétérinaire",
    text: "Emmenez-le rapidement chez un professionnel.",
  },
];

const Conseil = () => {
  return (
    <div style={{ height: "92vh" }} className="image-container">
 <img
          style={{ height: "100vh" }}
          src="/conseil.jpg"
          className="header-image"
        />
    <div className="containerr">
      <div className="title">
        <h4>Nos Conseils</h4>
        <h1>Secourisme pour Animaux</h1>
      </div>
      <div className="gride">
        {conseils.map((conseil) => (
          <div key={conseil.id} className="carde">
            <img src={conseil.icon} alt={conseil.title} className="icon" />
            <h3>{conseil.title}</h3>
            <p>{conseil.text}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Conseil;
