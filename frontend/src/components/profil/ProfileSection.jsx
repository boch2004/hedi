  import React, { useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import Swal from "sweetalert2";
  import "../UserProfile.css";
import { deleteuser, edituser } from "../../JS/userSlice/userSlice";
  const ProfileSection = ({ping,setping}) => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [edited, setEdited] = useState({
      name: user?.name || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
      password: user?.password || "",
      img: user?.img || "",
      phone: user?.phone || "",
      postalCode: user?.postalCode,
      location: user?.location,
    });

    useEffect(() => {
      if (user) {
        setEdited({
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          img: user.img,
          phone: user.phone,
          postalCode: user.postalCode,
          location: user.location,
        });
      }
    }, [user]);

    const handleDelete = () => {
      Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Action irréversible !",
        icon: "Attention",
        showCancelButton: true,
        confirmButtonText: "Confirmer la suppression",
        cancelButtonText: "Non, annuler !",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteuser(user._id));
          Swal.fire("Supprimée!", "Votre compte a été supprimé", "Succès");
          navigate("/login");
          setping(prev => !prev);
        }
      });
    };

    const handleSaveChanges = () => {
      const requiredFields = ["name", "lastname", "email", "phone", "location", "postalCode"];
      for (let field of requiredFields) {
        if (!edited[field]) {
          Swal.fire({
            icon: "warning",
            title: "Champ manquant",
            text: `Veuillez remplir le champ : ${field}`,
          });
          return;
        }
      }

      dispatch(edituser({ id: user._id, edited }));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Vos modifications ont été enregistrées",
        showConfirmButton: false,
        timer: 1500,
      });
      setping((prev) => !prev);
    };


    return (
      <div className="interface-profile">
        {/* Profile Section */}
        <div className="profile-header">
          <img
            src={
              user?.img ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnBLMyaL-5gh0nhP-vircgmtkHER58KHoMAw&s"
            }
            alt="Profile"
            className="profile-img"
          />
        </div>

        
        <div className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                className="form-input"
                name="name"
                value={edited.name}
                onChange={(e) => setEdited({ ...edited, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Prénom</label>
              <input
                type="text"
                className="form-input"
                name="lastname"
                value={edited.lastname}
                onChange={(e) =>
                  setEdited({ ...edited, lastname: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Adresse Email</label>
              <input
                type="email"
                className="form-input"
                name="email"
                value={edited.email}
                onChange={(e) => setEdited({ ...edited, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Numéro de téléphone</label>
              <input
                type="text"
                className="form-input"
                name="phone"
                value={edited.phone || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,8}$/.test(value)) {
                    setEdited({ ...edited, phone: value });
                  }
                }}
              />
            </div>

          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Localisation</label>
              <input
                type="text"
                className="form-input"
                name="location"
                value={edited.location || ""}
                onChange={(e) =>
                  setEdited({ ...edited, location: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Code Postale</label>
              <input
                type="text"
                className="form-input"
                name="postalCode"
                value={edited.postalCode || ""}
                onChange={(e) =>
                  setEdited({ ...edited, postalCode: e.target.value })
                }
              />
            </div>
          </div>

          <button className="btn-save" onClick={handleSaveChanges}>
            Enregistrer
          </button>

          {user?.category !== "admin" && (
          <button className="btn-delete" onClick={handleDelete}>
            Supprimer le compte
          </button>
          )}
        </div>
      </div>
    );
  };

  export default ProfileSection;
