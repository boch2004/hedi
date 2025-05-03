import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdoptionRequest,
  fetchAdoptionRequests,
} from "../../JS/userSlice/adoptionSlice";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { editanimal } from "../../JS/userSlice/animalSlice";
import { toast, ToastContainer } from "react-toastify";

function Lesadoptions() {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((state) => state.adoption);
  const user = useSelector((state) => state.user.user);
    const userRequests = requests; 
  
    const animals = useSelector((state) => state.animal?.animalList || []);


  useEffect(() => {
    dispatch(fetchAdoptionRequests());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteAdoptionRequest(id)).then((res) => {
      if (!res.error) {
        toast.success("L'élément a été Refusé avec succès!", {
          autoClose: 3000, 
        });
      } else {
        toast.error("Erreur lors de la suppression.", {
          autoClose: 3000,
        });
      }
    });
  };

  
  if (!user) {
    return <p style={{ color: "red" }}>Utilisateur non connecté.</p>;
  }


  const handleAdopt = (animalId) => {
    dispatch(
      editanimal({
        id: animalId,
        edited: { adoption: true },
      })
    );
  };
  return (
    <div>
         <div style={{ padding: "2rem" }}>
              <ToastContainer />
              <h2>Demandes d’adoption reçues</h2>
              {loading && <p>Chargement...</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
              <table
                border="1"
                cellPadding="10"
                style={{ width: "100%", marginTop: "1rem" }}
              >
                <thead>
                  <tr>
                    <th>Demandeur</th>
                    <th>Numéro de télephone</th>
                    <th>Email</th>
                    <th>Raison</th>
                    <th>Date</th>
                    <th>Animal ID</th>
                    <th>propriétaire</th>
                    <th style={{ textAlign: "center" }}>Adopter ? </th>
                    <th style={{ textAlign: "center" }}>Refuser l'adoption</th>
                  </tr>
                </thead>
                <tbody>
          {userRequests.map((r) => {
            const animal = animals.find((p) => p._id === r.idanimal); 
            return (
              <tr key={r._id}>
                <td>{r.name}</td>
                <td>{r.télephone}</td>
                <td>{r.email}</td>
                <td>{r.reason}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
                <td>
                  <Link to={`/animaux/${r.idanimal}`}>{r.idanimal}</Link>
                </td>
                    <td>{r.proprietaire}</td>
                <td style={{ textAlign: "center" }}>
                  <span
                  >
                            {animal?.adoption ? "Non" : "Oui"}
                  </span>
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
            );
          })}
        </tbody>
        
              </table>
            </div>
    </div>
  )
}

export default Lesadoptions