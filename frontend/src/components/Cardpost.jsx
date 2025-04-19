import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletepost } from "../JS/userSlice/postSlice";

function Cardpost({ product }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      dispatch(deletepost(id));
    }
  };
  return (
    <div>
      <div
        style={{
          border: "1px solid #000000",
          display: "flex",
          width: 170,
          paddingTop: 10,
        }}
      >
        {user?.category === "admin" && (
          <button
            style={{
              border: "none",
              background: "none",
              position: "relative",
              left: 140,
              top: -54,
              color: "red",
            }}
            onClick={() => handleDelete(product._id)} // ✅ Corrected here
          >
            X
          </button>
        )}

        <div className="food-sec">
          <h4 className="food-title">{product?.title}</h4>
          <p className="food-desc">{product?.content}</p>
          <p className="food-desc">{product?.Crea}</p>
        </div>
      </div>
    </div>
  );
}

export default Cardpost;
