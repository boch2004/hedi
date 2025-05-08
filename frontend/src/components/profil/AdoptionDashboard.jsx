import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdoptionRequest,
  fetchAdoptionRequests,
} from "../../JS/userSlice/adoptionSlice";
import { Link } from "react-router-dom";
import { editanimal } from "../../JS/userSlice/animalSlice";
import { toast, ToastContainer } from "react-toastify";

function AdoptionDashboard() {
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
      //why ?
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
            </tr>
          </thead>
          <tbody>
            {userRequests.map((r) => {
              const animal = animals.find((p) => p._id === r.idanimal);
              return (
                <tr key={r._id}>
                  <td>{r.name}</td>
                  <td>{r.telephone}</td>
                  <td>{r.email}</td>
                  <td>{r.reason}</td>
                  <td>{new Date(r.createdAt).toLocaleString()}</td>
                  <td>
                    <Link to={`/animaux/${r.idanimal}`}>{r.idanimal}</Link>
                  </td>
                  <td>{r.proprietaire}</td>
                  <td style={{ textAlign: "center" }}>
                    <span
                      style={{
                        color:
                          animal?.adoption === true
                            ? "green"
                            : animal?.adoption === false
                            ? "red"
                            : "orange",
                        fontWeight: "bold",
                        padding: "5px",
                      }}
                    >
                      {animal?.adoption === true
                        ? "Acceptée"
                        : animal?.adoption === false
                        ? "Refusée"
                        : "En attente"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdoptionDashboard;
