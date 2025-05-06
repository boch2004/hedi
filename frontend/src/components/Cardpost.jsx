import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletepost } from "../JS/userSlice/postSlice";
import "./Cardpost.css";
import Swal from "sweetalert2";


function Cardpost({ histoire }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);


  const handleDelete = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "Attention",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletepost(id));
        Swal.fire("Supprimé !", "L'élément a été supprimé.", "success");
      }
    });
  };

  return (
    <>
<div className="nakcha">
        {(user?._id === histoire?.userid || user?.category === "admin") && (
          // user le owner de histoire 
          <button
            style={{
              border: "none",
              background: "none",
              position: "absolute",
              right: 5,
              top: 5,
              color: "red",
              cursor: "pointer",
            }}
            onClick={() => handleDelete(histoire._id)}
          >
            X
          </button>
        )}

  <div>
    <h4 style={{margin:25,color:"black"}}>{histoire?.title}</h4>
    <p style={{margin:20,color:"#6c757d"}}>{histoire?.content}</p>
    <p style={{position:"absolute",bottom:0,right:10,color:"#6c757d"}}>{histoire?.Crea}</p>
  </div>
</div>

    </>


  );
}

export default Cardpost;
