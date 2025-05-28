import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addpost } from "../../JS/userSlice/postSlice";

function Buttonxp({ animal, ping, setping }) {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const user = useSelector((state) => state.user.user);

    const [newpost, setnewpost] = useState({
        title: "",
        content: "",
        idanimal: animal?._id || "",
        userid: user?._id,
    });

    const handleSubmit = () => {
        if (!newpost.title.trim() || !newpost.content.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Champs obligatoires",
                text: "Veuillez remplir tous les champs avant de soumettre.",
                confirmButtonColor: "#6366f1",
            });
            return;
        }

        dispatch(addpost(newpost));
        setping((prev) => !prev);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Votre expérience a été ajoutée !",
            showConfirmButton: false,
            timer: 1800,
        });
        handleClose();
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={handleShow} style={styles.button} disabled={show}>
                    Ajouter mon expérience
                </button>
            </div>

            {show && (
                <div className="modalinput" style={styles.modalOverlay} onClick={handleClose}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2 style={{ textAlign: "center", color: "#333" }}>Ajouter une Expérience</h2>
                        <label>Titre</label>
                        <input
                            type="text"
                            placeholder="Titre de votre expérience"
                            value={newpost.title}
                            onChange={(e) => setnewpost({ ...newpost, title: e.target.value })}
                            style={styles.input}
                            autoFocus
                        />
                        <label>Contenu</label>
                        <textarea
                            placeholder="Décrivez votre expérience..."
                            value={newpost.content}
                            onChange={(e) => setnewpost({ ...newpost, content: e.target.value })}
                            style={styles.textarea}
                            rows="4"
                        />
                        <div style={styles.buttonGroup}>
                            <button onClick={handleClose} style={styles.cancelButton}>
                                Annuler
                            </button>
                            <button onClick={handleSubmit} style={styles.saveButton}>
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
        padding: "10px 20px",
        backgroundColor: "#6366f1",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        margin: "10px",
        fontWeight: "bold",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
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
        padding: "30px",
        borderRadius: "12px",
        width: "450px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    },
    input: {
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "14px",
    },
    textarea: {
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "14px",
        resize: "none",
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        marginTop: "10px",
    },
    cancelButton: {
        padding: "10px 15px",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    saveButton: {
        padding: "10px 15px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
    },
};

export default Buttonxp;
