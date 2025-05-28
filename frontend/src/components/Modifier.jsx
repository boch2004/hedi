import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { editanimal } from "../JS/userSlice/animalSlice";
import { Toast } from "primereact/toast";


function Modifier({ animal, ping, setping }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const toast = useRef(null); 


  const typeOptions = [
    { label: "Chats", value: "Chats" },
    { label: "Chiens", value: "Chiens" },
    { label: "Petits Mammifères", value: "Petits Mammifères" },
    { label: "Oiseaux", value: "Oiseaux" },
    { label: "Reptiles & Amphibiens", value: "Reptiles & Amphibiens" },
    { label: "Poissons", value: "Poissons" },
  ];
  const VaccinOptions = [
    { label: "Oui", value: "Oui" },
    { label: "Non", value: "Non" },
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
//afficher les infos précidente 
  useEffect(() => {
    if (animal) {
      const parsedDate = animal.birthDate ? new Date(animal.birthDate) : null;
      setEdited({
        name: animal.name || "",
        img: null,
        description: animal.description || "",
        race: animal.race || "",
        gender: animal.gender || "",
        location: animal.location || "",
        birthDate: parsedDate,
        age: animal.age || "",
        Activite: animal.Activite || "",
        Couleur: animal.Couleur || "",
        remarque: animal.remarque || "",
        vaccin: animal.vaccin || "",
        Type: animal.Type || "",
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

  const handleSave = () => {
    const requiredFields = ["name", "description", "race", "Type", "gender", "location", "birthDate", "Activite", "Couleur", "remarque", "vaccin"];
    for (let field of requiredFields) {
      if (!edited[field]) {
        toast.current.show({
          severity: "warn",
          summary: "Champ requis",
          detail: `Veuillez remplir le champ : ${field}`,
          life: 3000,
        });
        return;
      }
    }

    const formData = new FormData();
    for (let key in edited) {
      if (key === "img" && !edited.img) continue;
      formData.append(key, edited[key]);
    }

    dispatch(editanimal({ id: animal._id, edited: formData }));
    setping((prev) => !prev);
    setShow(false);
  };


  return (
    <>
      <Toast ref={toast} />
      <button onClick={() => setShow(true)} style={styles.button}>Modifier</button>

      {show && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Modifier l'animal</h2>

            <div style={styles.row}>
              <div style={styles.column}>
                <label>Nom</label>
                <input
                  value={edited.name}
                  onChange={(e) => setEdited({ ...edited, name: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.column}>
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEdited({ ...edited, img: e.target.files[0] })
                  }
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.column}>
                <label>Description</label>
                <input
                  value={edited.description}
                  onChange={(e) => setEdited({ ...edited, description: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.column}>
                <label>Race</label>
                <input
                  value={edited.race}
                  onChange={(e) => setEdited({ ...edited, race: e.target.value })}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.column}>
                <label>Type</label>
                <Dropdown
                  value={edited.Type}
                  options={typeOptions}
                  onChange={(e) => setEdited({ ...edited, Type: e.value })}
                  placeholder="Type d'animal"
                  className="p-inputtext-sm"
                  style={styles.input}
                />
              </div>
              <div style={styles.column}>
                <label>Sexe</label>
                <Dropdown
                  value={edited.gender}
                  options={genderOptions}
                  onChange={(e) => setEdited({ ...edited, gender: e.value })}
                  placeholder="Sexe"
                  className="p-inputtext-sm"
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.column}>
                <label>Date de naissance</label>
                <Calendar
                  value={edited.birthDate}
                  onChange={(e) => setEdited({ ...edited, birthDate: e.value })}
                  dateFormat="dd/mm/yy"
                  showIcon
                  style={styles.input}
                />
              </div>
              <div style={styles.column}>
                <label>Activité</label>
                <Dropdown
                  value={edited.Activite}
                  options={activiteOptions}
                  onChange={(e) => setEdited({ ...edited, Activite: e.value })}
                  placeholder="Activité"
                  className="p-inputtext-sm"
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.column}>
                <label>Couleur</label>
                <input
                  value={edited.Couleur}
                  onChange={(e) => setEdited({ ...edited, Couleur: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.column}>
                <label>Lieu</label>
                <input
                  value={edited.location}
                  onChange={(e) => setEdited({ ...edited, location: e.target.value })}
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.row}>
              <div style={styles.column}>
                <label>Remarque</label>
                <input
                  value={edited.remarque}
                  onChange={(e) => setEdited({ ...edited, remarque: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.column}>
                <label>Vaccin</label>
                <Dropdown
                  value={edited.vaccin}
                  options={VaccinOptions}
                  onChange={(e) => setEdited({ ...edited, vaccin: e.value })}
                  placeholder="Vaccin"
                  className="p-inputtext-sm"
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button onClick={() => setShow(false)} style={styles.cancelButton}>Annuler</button>
              <button onClick={handleSave} style={styles.saveButton}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  button: {
    margin: "5px",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    overflow: "auto",
    padding: "20px",
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    marginTop: "300px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  },
  row: {
    display: "flex",
    gap: "10px",
  },
  column: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
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

export default Modifier;
