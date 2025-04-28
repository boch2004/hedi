import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdoptionRequest,
  fetchAdoptionRequests,
} from "../../JS/userSlice/adoptionSlice";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import { editanimal } from "../../JS/userSlice/animalSlice";
import { toast, ToastContainer } from "react-toastify";

function AdoptionDashboard() {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((state) => state.adoption);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchAdoptionRequests());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette demande ?")) {
      dispatch(deleteAdoptionRequest(id)).then((res) => {
        // تحقق من نجاح الحذف ثم عرض توست النجاح
        if (!res.error) {
          toast.success("L'élément a été Refusé avec succès!", {
            autoClose: 3000, // اغلاق التوست بعد 3 ثواني
          });
        } else {
          toast.error("Erreur lors de la suppression.", {
            autoClose: 3000,
          });
        }
      });
    }
  };
  
  if (!user) {
    return <p style={{ color: "red" }}>Utilisateur non connecté.</p>;
  }

  const userRequests = requests.filter((r) => r.iduser === user._id);

  const handleAdopt = (animalId) => {
    dispatch(
      editanimal({
        id: animalId,
        edited: { Adoption: true },
      })
    );
  };
  return (
    <div style={{ padding: "2rem" }}>
      <ToastContainer />
      <h2>Liste des demandes d’adoption</h2>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", marginTop: "1rem" }}
      >
        <thead>
          <tr>
            <th>Nom</th>
            <th>Numéro de télephone</th>
            <th>Email</th>
            <th>Raison</th>
            <th>Date</th>
            <th>Animal ID</th>
            <th style={{ textAlign: "center" }}>Confirmer l'adoption </th>
            <th style={{ textAlign: "center" }}>Refuser l'adoption</th>
          </tr>
        </thead>
        <tbody>
          {userRequests.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.télephone}</td>
              <td>{r.email}</td>
              <td>{r.reason}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
              <td>
                <Link to={`/animaux/${r.idanimal}`}>{r.idanimal}</Link>
              </td>
              <td style={{ textAlign: "center" }}>
                <span onClick={() => handleDelete(r._id)} style={{ fontSize: 26, cursor: "pointer" }}>✅</span>
                <button
                  onClick={handleAdopt}
                  disabled={r.adoption} // يعطل الزر إذا هو déjà تم تبنيه
                  className={`px-4 py-2 rounded ${
                    r.adoption
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-700"
                  } text-white`}
                >
                  {r.adoption ? "Already Adopted" : "Adopt Me"}
                </button>
              </td>
              <td
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <span
                  onClick={() => handleDelete(r._id)}
                  style={{
                    marginTop: 13,
                    width: "27px",
                    height: "27px",
                    backgroundColor: "#ef4444",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  <FaTimes
                    style={{
                      color: "white",
                      fontSize: "20px",
                      paddingRight: 8,
                    }}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdoptionDashboard;
