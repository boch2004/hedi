import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletepost } from "../JS/userSlice/postSlice";
import "./Cardpost.css";


function Cardpost({ product }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      dispatch(deletepost(id));
    }
  };
  return (
    <>
<div className="nakcha">
{user?.category === "admin" && (
          <button
            style={{
              border: "none",
              background: "none",
              position: "absolute",
              right: 5,
              top:5,
              color: "red",
            }}
            onClick={() => handleDelete(product._id)} // ✅ Corrected here
          >
            X
          </button>
        )}
  <div className="">
    <h4 style={{margin:25,color:"black"}}>{product?.title}</h4>
    <p style={{margin:20,color:"#6c757d"}}>{product?.content}</p>
    <p style={{position:"absolute",bottom:0,right:10,color:"#6c757d"}}>{product?.Crea}</p>
  </div>
</div>

    </>


  );
}

export default Cardpost;
