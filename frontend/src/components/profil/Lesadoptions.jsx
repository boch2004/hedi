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

function Lesadoptions() {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((state) => state.adoption);
  const user = useSelector((state) => state.user.user);
  const animals = useSelector((state) => state.animal?.animalList || []);

  const userRequests = requests.filter(
    (r) =>
      r.iduser === user?._id &&
      animals.find((a) => a._id === r.idanimal)?.adoption !== false
  );
  

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
          {userRequests.map((r) => {
            const animal = animals.find((p) => p._id === r.idanimal);
            const handleRefuse = (idanimal, requestId) => {
              dispatch(
                editanimal({
                  id: idanimal,
                  edited: { adoption: false },
                })
              ).then(() => {
                toast.success("Adoption refusée avec succès !", {
                  autoClose: 3000,
                });
              });
            };

            const handleAdopt = (id) => {
              dispatch(
                editanimal({
                  id,
                  edited: { adoption: true },
                })
              ).then(() => {
                toast.success("Adoption confirmée !", {
                  autoClose: 3000,
                });
              });
            };

            return (
              <tr
                style={{ background: animal?.adoption ? "#86ff86" : "" }}
                key={r._id}
              >
                <td>{r.name}</td>
                <td>{r.telephone}</td>
                <td>{r.email}</td>
                <td>{r.reason}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
                <td>
                  <Link to={`/animaux/${r.idanimal}`}>{r.idanimal}</Link>
                </td>
                <td style={{ textAlign: "center" }}>
                  <span
                    onClick={() => handleAdopt(r.idanimal)} // هنا نبعث ID
                    style={{ fontSize: 26, cursor: "pointer" }}
                  >
                    ✅
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
                    onClick={() => handleRefuse(r.idanimal, r._id)}
                    style={{
                      marginTop: 13,
                      width: "27px",
                      height: "27px",
                      backgroundColor: "#ef4444",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <FaTimes //icons
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
  );
}

export default Lesadoptions;
