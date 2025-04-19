import Modifier from "../Modifier";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteanimal } from "../../JS/userSlice/animalSlice";

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
        setping(!ping);
        Swal.fire("Deleted!", "Your recipe has been deleted.", "success");
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
              <img style={{ width: 250 }} src={`http://localhost:5000/uploads/${el.img}`} alt={el.titel} />
              <div className="animal-sec">
                <h4 className="animal-title" style={{ textAlign: "center", color: "black" }}>
                  {el.titel}
                </h4>
                <p className="animal-desc">
                  <strong className="h1name">Description:&nbsp;</strong>{el.description}
                </p>
                <p className="animal-desc">
                  <strong className="h1name">Name:&nbsp;</strong>{el.name}
                </p>
                <p className="animal-desc">
                  <strong className="h1name">Race:&nbsp;</strong>{el.race}
                </p>
                <p className="animal-desc">
                  <strong className="h1name">Gender:&nbsp;</strong>{el.gender}
                </p>
                <p className="animal-desc">
                  <strong className="h1name">Location:&nbsp;</strong>{el.location}
                </p>
              </div>

              <Modifier animal={el} ping={ping} setping={setping} />

              <button
                onClick={() => handleDelete(el?._id)}
                className="delete-button"
              >
                X
              </button>
            </div>
          ))
        )}
      </div>
    </>

  );
}

export default Mes_animaux;
