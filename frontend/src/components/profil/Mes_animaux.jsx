import Modifier from "../Modifier";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteanimal } from "../../JS/userSlice/animalSlice";
import { Link } from "react-router";
import { FaTimes } from "react-icons/fa";

function Mes_animaux({ ping, setping }) {
  const user = useSelector((state) => state.user.user);
  const Animals = useSelector((state) => state.animal?.animalList || []);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    //supprimer for user
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "Attention ",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Non, annuler !",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteanimal(id));
        setping(prev => !prev);
        Swal.fire("Supprimé !!", "Votre animal a été supprimé.", "Succès");
      }
    });
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to={"/Ajouter"}>
        <button style={styles.button}>
          Ajouter un animal
        </button>
        </Link>
      </div>
      <div style={{ display: "flex", marginTop: 25, flexWrap: "wrap", justifyContent: "center" }}> 
        {Animals?.filter((el) => el.idanimal === user?._id).length === 0 ? (
          <h2 style={{ color: "#555" }}>Vous n'avez ajouté aucun animal pour le moment.</h2>
        ) : (
          Animals?.filter((el) => el.idanimal === user?._id).map((el) => (
            <div key={el._id} className="animal-card">
              <Link to={`/animaux/${el._id}`}><img style={{ width: 250, height: 250 }} src={`back-adoption-production.up.railway.app/uploads/${el.img}`} alt={el.name} /></Link>
              <div className="animal-sec">
                <button
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center", background: "none", border: "none", position: "relative", bottom: 226, left: 98, color: "red"
                  }}
                  onClick={() => handleDelete(el?._id)}
                >
                  <span
                    style={{
                      marginTop: 13,
                      width: "27px",
                      height: "27px",
                      backgroundColor: "#ef4444",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <FaTimes
                      style={{
                        color: "white",
                        fontSize: "20px",
                        paddingRight: 8,
                      }}
                    />
                  </span>
                </button>
                <p className="animal-desc">
                  <strong className="h1name">Name:&nbsp;</strong><span style={{ color: "#606060" }}>{el.name}</span>
                </p>
                <p className="animal-desc">
                  <strong className="h1name">Gender:&nbsp;</strong><span style={{ color: "#606060" }}>{el.gender}</span>
                </p>
                <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                  <Modifier animal={el} ping={ping} setping={setping} />
                  <Link to={`/animaux/${el._id}`}><button className="info-button">Plus d'informations</button></Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>

  );
} const styles = {
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
}

export default Mes_animaux;
