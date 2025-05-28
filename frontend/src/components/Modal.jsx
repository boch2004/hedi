import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addpost } from "../JS/userSlice/postSlice";
import Swal from "sweetalert2";

function Modal({ animal, ping, setping }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [newpost, setnewpost] = useState({
    title: "",
    content: "",
    userid: user?._id,
  });

  useEffect(() => {
    if (animal) {
      setnewpost({
        title: animal.title || "",
        content: animal.content || "",
        userid: user?._id,
      });
    }
  }, [animal]);

  const handleSubmit = () => {
    if (!newpost.title.trim() || !newpost.content.trim()) {
      Swal.fire({
        icon: "error",
        title: "Champs obligatoires",
        text: "Veuillez remplir tous les champs.",
      });
      return;
    }

    dispatch(addpost(newpost));
    setping((prev) => !prev);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Post ajouté avec succès",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  

  return (
    <div style={styles.formWrapper}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Ajouter une expérience</h2>
        <label>Titre</label>
        <input
          type="text"
          value={newpost.title}
          onChange={(e) => setnewpost({ ...newpost, title: e.target.value })}
          style={styles.input}
          autoFocus
        />
        <label>Contenu</label>
        <textarea
          value={newpost.content}
          required
          onChange={(e) => setnewpost({ ...newpost, content: e.target.value })}
          style={styles.textarea}
          rows={4}
        />
        <div style={styles.buttonContainer}>
          <button onClick={handleSubmit} style={styles.saveButton}>
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  formWrapper: {

    width: "80vw",
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efeff1",
  },
  
  formCard: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  },
  textarea: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
    resize: "none",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
  },
  saveButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Modal;
