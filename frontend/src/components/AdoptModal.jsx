import React, { useState } from 'react';
import './Modal.css';
import { useDispatch, useSelector } from "react-redux";
import { submitAdoptionRequest } from "../JS/userSlice/adoptionSlice";

function AdoptModal({ animalId,user_id }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.adoption);
  const user = useSelector((state) => state.user?.user); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      name: form[0].value,
      email: form[1].value,
      reason: form[2].value,
      idanimal: animalId,
      iduser: user_id,
    };

    dispatch(submitAdoptionRequest(formData)).then((res) => {
      if (!res.error) {
        alert("Demande envoyée avec succès !");
        setShowModal(false);
      } else {
        alert("Erreur : " + res.payload);
      }
    });
  };

  return (
    <>
      <button className='adopt-btn' onClick={() => setShowModal(true)}>Adopter maintenant</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Demande d'adoption</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Nom :
                <input type="text" required />
              </label>
              <label>
                Email :
                <input type="email" required />
              </label>
              <label>
                Pourquoi souhaitez-vous adopter ?
                <textarea required />
              </label>
              <div className="modal-actions">
                <button type="submit" disabled={loading}>
                  {loading ? "Envoi en cours..." : "Envoyer"}
                </button>
                <button type="button" onClick={() => setShowModal(false)}>Annuler</button>
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>Votre demande a été envoyée !</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AdoptModal;
