import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editanimal } from "../JS/userSlice/animalSlice";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";

function Modifier({ animal, ping, setping }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const raceOptions = [
    { label: "Labrador", value: "Labrador" },
    { label: "Berger Allemand", value: "Berger Allemand" },
    { label: "Chat Persan", value: "Chat Persan" },
    { label: "Chat Siamois", value: "Chat Siamois" },
    { label: "Croisé", value: "Croisé" },
  ];

  const genderOptions = [
    { label: "Mâle", value: "Mâle" },
    { label: "Femelle", value: "Femelle" },
  ];

  const activiteOptions = [
    { label: "Calme", value: "Calme" },
    { label: "Joueur", value: "Joueur" },
    { label: "Sportif", value: "Sportif" },
    { label: "Protecteur", value: "Protecteur" },
    { label: "Indépendant", value: "Indépendant" },
  ];
  

  const [edited, setEdited] = useState({});

  useEffect(() => {
    if (animal) {
      const parsedDate = animal.birthDate ? new Date(animal.birthDate) : null;
      setEdited({
        name: animal.name || "",
        img: animal.img || "",
        description: animal.description || "",
        race: animal.race || "",
        gender: animal.gender || "",
        location: animal.location || "",
        birthDate: parsedDate,
        age: animal.age || "",
        Activite: animal.Activite || "",
        Couleur: animal.Couleur || "", 
      });
      
    }
  }, [animal]);

  useEffect(() => {
    if (edited.birthDate) {
      const today = new Date();
      const birth = new Date(edited.birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      setEdited((prev) => ({
        ...prev,
        age: `${age} ans`,
      }));
    }
  }, [edited.birthDate]);

  return (
    <>
      <button onClick={() => setShow(true)} style={styles.button}>Modifier</button>

      {show && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Modifier l'animal</h2>

            <label>Nom</label>
            <input
              value={edited.name}
              onChange={(e) => setEdited({ ...edited, name: e.target.value })}
              style={styles.input}
            />

            <label>Image (URL)</label>
            <input
              value={edited.img}
              onChange={(e) => setEdited({ ...edited, img: e.target.value })}
              style={styles.input}
            />

            <label>Description</label>
            <input
              value={edited.description}
              onChange={(e) => setEdited({ ...edited, description: e.target.value })}
              style={styles.input}
            />

            <label>Race</label>
            <Dropdown
              value={edited.race}
              options={raceOptions}
              onChange={(e) => setEdited({ ...edited, race: e.value })}
              placeholder="Choisir une race"
              className="p-inputtext-sm"
            />

            <label>Sexe</label>
            <Dropdown
              value={edited.gender}
              options={genderOptions}
              onChange={(e) => setEdited({ ...edited, gender: e.value })}
              placeholder="Choisir le sexe"
              className="p-inputtext-sm"
            />

            <label>Date de naissance</label>
            <Calendar
                id="date"
              value={edited.birthDate}
              onChange={(e) => setEdited({ ...edited, birthDate: e.value })}
              dateFormat="dd/mm/yy"
              showIcon
            />

<label>Activité</label>
<Dropdown
  value={edited.Activite}
  options={activiteOptions}
  onChange={(e) => setEdited({ ...edited, Activite: e.value })}
  placeholder="Choisir une activité"
  className="p-inputtext-sm"
/>
<label>Couleur</label>
<input
  value={edited.Couleur}
  onChange={(e) => setEdited({ ...edited, Couleur: e.target.value })}
  style={styles.input}
/>




            <label>Lieu</label>
            <input
              value={edited.location}
              onChange={(e) => setEdited({ ...edited, location: e.target.value })}
              style={styles.input}
            />

            <div style={styles.buttonGroup}>
              <button onClick={() => setShow(false)} style={styles.cancelButton}>Annuler</button>
              <button
                onClick={() => {
                  dispatch(editanimal({ id: animal._id, edited }));
                  setping(prev => !prev);
                  setShow(false);
                }}
                style={styles.saveButton}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
    button: {
        padding: "10px 15px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        margin: "5px",
    },
    modalOverlay: {
        position: "absolute",
        top: 0,
        left: 0,        
        width: "100%",
        height: "110%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        position: "absolute",
        top: 100,
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
        margin:0,
        },
    textarea: {
        width: "100%",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        height: "80px",
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

export default Modifier;
