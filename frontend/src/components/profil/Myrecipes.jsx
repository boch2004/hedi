import Modal from "../Modal";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteanimal } from "../../JS/userSlice/animalSlice";

function Myrecipes({ ping, setping }) {
  const animaldeleteanimals = useSelector((state) => state.animaldeleteanimal.animaldeleteanimallist);
  const user = useSelector((state) => state.user.user);
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
    <div className="recipes-container">
      <table className="recipes-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Description</th>
            <th>Ingredients</th>
            <th>Directions</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {animaldeleteanimals
            ?.filter((el) => el.idchef === user?._id)
            .map((el) => (
              <tr key={el?._id}>
                <td>{el?.titel}</td>
                <td>
                  <img src={el?.img} alt={el?.titel} className="recipe-image" />
                </td>
                <td>{el?.description}</td>
                <td>{el?.Ingredients}</td>
                <td>{el?.Directions}</td>
                <td>
                  <Modal animaldeleteanimal={el} ping={ping} setping={setping} />
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(el?._id)}
                    className="delete-button"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Myrecipes;
