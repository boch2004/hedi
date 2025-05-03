import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addpost } from "../JS/userSlice/postSlice";
import Swal from "sweetalert2";

function Modal({ animal, ping, setping }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useSelector((state) => state.user.user);


  // Déclaration de l'état 'newpost' pour l'ajout du post
  const [newpost, setnewpost] = useState({
    title: "",
    content: "",
    userid: user?._id,
  });

  // Utilisation de useEffect pour mettre à jour les valeurs de 'newpost' avec les données de l'animal
  useEffect(() => {
    if (animal) {
      setnewpost({
        title: animal.title || "",
        content: animal.content || "",
            });
    }
  }, [animal, show]);

  return (
    <>
    <div style={{display:"flex",justifyContent:"center"}}>
      <button onClick={handleShow} style={styles.button} disabled={show}>
        Ajouter mon histoire
      </button>
      </div>

      {show && (
        <div className="modalinput" style={styles.modalOverlay} onClick={handleClose}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Ajouter une Histoire</h2>
            <label>Titre</label>
            <input
              type="text"
              value={newpost.title}
              onChange={(e) => setnewpost({ ...newpost, title: e.target.value })}
              style={styles.input}
              autoFocus
            />
            <label>Contenu</label>
            <input
              type="text"
              value={newpost.content}
              onChange={(e) => setnewpost({ ...newpost, content: e.target.value })}
              style={styles.input}
            />
            <div style={styles.buttonGroup}>
              <button onClick={handleClose} style={styles.cancelButton}>
                Fermé
              </button>
              <button
                onClick={() => {
                  dispatch(addpost(newpost));
                  setping(prev => !prev);
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Post has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  handleClose();
                }}
                style={styles.saveButton}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Styles CSS
const styles = {
  button: {
    padding: "10px 15px",
    backgroundColor: "#6366f1",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px",
    transition: "0.3s",
  },
  modalOverlay: {
    position: "fixed",
    zIndex: 1000,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  cancelButton: {
    padding: "10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  saveButton: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Modal;
