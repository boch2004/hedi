import Modifier from "../Modifier";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteanimal } from "../../JS/userSlice/animalSlice";
import { Link } from "react-router";

function Mes_animaux({ ping, setping }) {
  const user = useSelector((state) => state.user.user);
  const Animals = useSelector((state) => state.animal?.animalList || []);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteanimal(id));
        setping(prev => !prev);
        Swal.fire("Deleted!", "Your animal has been deleted.", "success");
      }
    });
  };
  return (
    <>
      <div style={{ display: "flex", marginTop: 25, flexWrap: "wrap", justifyContent: "center" }}>
        {Animals?.filter((el) => el.idanimal === user?._id).length === 0 ? (
          <h2 style={{ color: "#555" }}>Vous n'avez ajouté aucun animal pour le moment.</h2>
        ) : (
          Animals?.filter((el) => el.idanimal === user?._id).map((el) => (
            <div key={el._id} className="animal-card">
              <Link to={`/animaux/${el._id}`}><img style={{ width: 250,height:250 }} src={`http://localhost:5000/uploads/${el.img}`} alt={el.titel} /></Link>
              <div className="animal-sec">
                <p className="animal-desc">
                  <strong className="h1name">Name:&nbsp;</strong><span style={{ color: "#606060" }}>{el.name}</span>
                </p>
                <p className="animal-desc">
                  <strong className="h1name">Gender:&nbsp;</strong><span style={{ color: "#606060" }}>{el.gender}</span>
                </p>
                <div style={{display:"flex",justifyContent:"space-around",width:"100%"}}> 
                 <Modifier animal={el} ping={ping} setping={setping} />

                  <button
                    onClick={() => handleDelete(el?._id)}
                    className="delete-button"
                  >
                    Supprimer
                  </button></div>
              </div>
            </div>
          ))
        )}
      </div>
    </>

  );
}

export default Mes_animaux;
