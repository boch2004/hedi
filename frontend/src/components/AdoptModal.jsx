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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      name: form[0].value,
      télephone: form[1].value,
      email: form[2].value,
      reason: form[3].value,
      idanimal: animalId,
      iduser: user_id,
    };

    dispatch(submitAdoptionRequest(formData)).then((res) => {
      if (!res.error) {
        toast.success("Votre demande a été envoyée !", {
          position: "top-right", // مكان ظهور التنبيه
          autoClose: 5000, // الوقت اللي يتم فيه إغلاق التنبيه
          hideProgressBar: false, // لإظهار شريط التقدم
          closeOnClick: true, // أغلق التنبيه عند الضغط عليه
          pauseOnHover: true, // إيقاف مؤقت عند التمرير فوقه
          draggable: true, // سحب التنبيه
        });        
        setShowModal(false);
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
              text: "Merci de vous connecter pour adopter.",
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
                Nom :
                <input type="text" required />
              </label>
              <label>
                Numéro de téléphone :
                <input type="tel" required />
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
                <button type="button" onClick={() => setShowModal(false)}>
                  Annuler
                </button>
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
