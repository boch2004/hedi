import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAdoptionRequest, fetchAdoptionRequests } from '../../JS/userSlice/adoptionSlice';
import { Link } from "react-router-dom";

function AdoptionDashboard() {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector(state => state.adoption);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    dispatch(fetchAdoptionRequests());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette demande ?")) {
      dispatch(deleteAdoptionRequest(id));
    }
  };

  if (!user) {
    return <p style={{ color: 'red' }}>Utilisateur non connecté.</p>;
  }

  const userRequests = requests.filter(r => r.iduser === user._id);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Liste des demandes d’adoption</h2>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Raison</th>
            <th>Date</th>
            <th>Animal ID</th>
            <th style={{ textAlign: "center" }}>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {userRequests.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.reason}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
              <td><Link to={`/animaux/${r.idanimal}`}>{r.idanimal}</Link></td>
              <td style={{ textAlign: "center" }}>
                <button
                  style={{ background: "red", color: "white", border: "none", borderRadius: 5,}}
                  onClick={() => handleDelete(r._id )}
                  
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

export default AdoptionDashboard;
