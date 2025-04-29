import React, { useState } from 'react';
import './Modal.css';
import { useDispatch, useSelector } from "react-redux";
import { submitAdoptionRequest } from "../JS/userSlice/adoptionSlice";
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';

function AdoptModal({ animalId, user_id }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.adoption);
  const user = useSelector((state) => state.user?.user);
  const [isChecked, setIsChecked] = useState(false);
  const [reason, setReason] = useState('');

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier si le champ raison est vide
    if (reason.trim() === '') {
      toast.error("Veuillez expliquer pourquoi vous souhaitez adopter.");
      return;
    }

    // Vérifier si la case n'est pas cochée
    if (!isChecked) {
      toast.error("Vous devez accepter la charte avant d'envoyer votre demande.");
      return;
    }

    const formData = {
      name: user?.name,
      télephone: user?.télephone,
      email: user?.email,
      reason: reason, // On récupère directement depuis le state
      idanimal: animalId,
      iduser: user_id,
    };

    dispatch(submitAdoptionRequest(formData)).then((res) => {
      if (!res.error) {
        toast.success("Votre demande a été envoyée avec succès !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setShowModal(false);
        setReason('');
        setIsChecked(false);
      } else {
        toast.error("Erreur : " + res.payload);
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <button
        className='adopt-btn'
        onClick={() => {
          if (!user) {
            Swal.fire({
              icon: "warning",
              title: "Vous devez vous connecter d'abord",
              text: "Veuillez vous connecter pour adopter.",
            });
          } else {
            setShowModal(true);
          }
        }}
      >
        Adopter maintenant
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Demande d'adoption</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Pourquoi souhaitez-vous adopter ?
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </label>

              <p style={{ marginTop: '8px' }}>
                Si j'adopte cet animal, je m'engage à lui offrir amour, soins, protection et respect tout au long de sa vie, et à répondre à tous ses besoins physiques, émotionnels et médicaux.
              </p>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                <input
                  type="checkbox"
                  style={{ margin: 0, width: "17px" }}
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span>Je confirme mon engagement</span>
              </label>

              <div className="modal-actions" style={{ marginTop: '15px' }}>
                <button type="submit" disabled={loading}>
                  {loading ? "Envoi en cours..." : "Envoyer"}
                </button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Annuler
                </button>
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>Votre demande a été envoyée avec succès !</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AdoptModal;
