import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addanimal } from "../JS/userSlice/animalSlice";
import Swal from "sweetalert2";
import { Calendar } from "primereact/calendar";
import "./Ajouter.css";
import { Dropdown } from "primereact/dropdown";

function Ajouter() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const genderOptions = [
    { label: "Mâle", value: "Mâle" },
    { label: "Femelle", value: "Femelle" },
  ];

  const raceOptions = [
    { label: "Labrador", value: "Labrador" },
    { label: "Berger Allemand", value: "Berger Allemand" },
    { label: "Chat Persan", value: "Chat Persan" },
    { label: "Chat Siamois", value: "Chat Siamois" },
    { label: "Croisé", value: "Croisé" },
  ];

  const activiteOptions = [
    { label: "Calme", value: "Calme" },
    { label: "Joueur", value: "Joueur" },
    { label: "Sportif", value: "Sportif" },
    { label: "Protecteur", value: "Protecteur" },
    { label: "Indépendant", value: "Indépendant" },
  ];

  const [newanimal, setnewanimal] = useState({
    name: "",
    img: "",
    description: "",
    race: "",
    age: "",
    birthDate: null,
    gender: "",
    Activite: "",
    Couleur: "",
    location: "",
    remarque: "",
    idanimal: user?._id,
  });

  // حساب العمر بناءً على التاريخ المحدد من Calendar
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    let ageText = "";
    if (years === 0) {
      if (months < 1) {
        ageText = "moins d'un mois";
      } else if (months === 1) {
        ageText = "1 mois";
      } else {
        ageText = `${months} mois`;
      }
    } else {
      if (months === 0) {
        ageText = `${years} an`;
      } else if (months === 1) {
        ageText = `${years} an et 1 mois`;
      } else {
        ageText = `${years} an(s) et ${months} mois`;
      }
    }

    return ageText;
  };

  const isFormValid = () => {
    return (
      newanimal.img &&
      newanimal.name &&
      newanimal.description &&
      newanimal.race &&
      newanimal.age &&
      newanimal.gender &&
      newanimal.Activite &&
      newanimal.Couleur &&
      newanimal.location &&
      newanimal.remarque
    );
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        {/* Image */}
        <div
          style={{
            backgroundImage: `url("https://www.la-spa.fr/app/app/uploads/2023/09/prendre-soin_mon-chien-saute-sur-les-gens.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "50%",
            height: "126vh",
          }}
        ></div>

        {/* Formulaire */}
        <div
          style={{
            backgroundColor: "#efeff1",
            width: "50%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 50,
            marginTop: 250,
          }}
          className="inputt"
        >
          <h1>Ajouter un animal</h1>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <h5>
                Nom de l’animal<span>*</span>
              </h5>
              <input
                type="text"
                onChange={(e) =>
                  setnewanimal({ ...newanimal, name: e.target.value })
                }
              />
            </div>
            <div style={{ flex: 1 }}>
              <h5>
                Image<span>*</span>
              </h5>
              <input
                style={{ padding: "8.3px" }}
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setnewanimal({ ...newanimal, img: e.target.files[0] })
                }
              />
            </div>
          </div>

          <h5>
            Description<span>*</span>
          </h5>
          <input
            type="text"
            onChange={(e) =>
              setnewanimal({ ...newanimal, description: e.target.value })
            }
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <h5>
                Race<span>*</span>
              </h5>
              <Dropdown
                value={newanimal.race}
                options={raceOptions}
                onChange={(e) => setnewanimal({ ...newanimal, race: e.value })}
                placeholder="Choisir une race"
                className="p-inputtext-sm"
              />
            </div>
            <div style={{ flex: 1 }}>
              <h5>
                Date de naissance<span>*</span>
              </h5>
              <Calendar
                id="date"
                value={newanimal.birthDate}
                onChange={(e) => {
                  const age = calculateAge(e.value);
                  setnewanimal({
                    ...newanimal,
                    birthDate: e.value, // التاريخ
                    age: age, // العمر المحسوب كنص
                  });
                }}
                dateFormat="dd/mm/yy"
                showIcon
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <h5>
                Sexe<span>*</span>
              </h5>
              <Dropdown
                value={newanimal.gender}
                options={genderOptions}
                onChange={(e) =>
                  setnewanimal({ ...newanimal, gender: e.value })
                }
                placeholder="Choisir le sexe"
                className="p-inputtext-sm"
              />
            </div>
            <div style={{ flex: 1 }}>
              <h5>
                Activite<span>*</span>
              </h5>
              <Dropdown
                value={newanimal.Activite}
                options={activiteOptions}
                onChange={(e) =>
                  setnewanimal({ ...newanimal, Activite: e.value })
                }
                placeholder="Choisir une activite"
                className="p-inputtext-sm"
              />
            </div>
          </div>

          <h5>
            Couleur<span>*</span>
          </h5>
          <input
            type="text"
            onChange={(e) =>
              setnewanimal({ ...newanimal, Couleur: e.target.value })
            }
          />

          <h5>
            Lieu<span>*</span>
          </h5>
          <input
            type="text"
            onChange={(e) =>
              setnewanimal({ ...newanimal, location: e.target.value })
            }
          />

          <h5>
            Remarque<span>*</span>
          </h5>
          <input
            type="text"
            onChange={(e) =>
              setnewanimal({ ...newanimal, remarque: e.target.value })
            }
          />

          <div className="wrapper">
            <a
              onClick={() => {
                if (isFormValid()) {
                  const formData = new FormData();
                  formData.append("name", newanimal.name);
                  formData.append("img", newanimal.img);
                  formData.append("description", newanimal.description);
                  formData.append("race", newanimal.race);
                  formData.append("gender", newanimal.gender);
                  formData.append("location", newanimal.location);
                  formData.append("remarque", newanimal.remarque);
                  formData.append("Couleur", newanimal.Couleur);
                  formData.append("Activite", newanimal.Activite);
                  formData.append("age", newanimal.age);
                  formData.append("idanimal", newanimal.idanimal);

                  dispatch(addanimal(formData));

                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "L'animal a été ajouté avec succès",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                } else {
                  Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Veuillez remplir tous les champs",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              }}
            >
              <span>Enregistrer</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ajouter;
