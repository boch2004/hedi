    import React, { useEffect } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import {
    deleteAdoptionRequest,
    fetchAdoptionRequests,
    } from "../../JS/userSlice/adoptionSlice";
    import { Link } from "react-router-dom";
    import { FaTimes } from "react-icons/fa";
    import { toast, ToastContainer } from "react-toastify"; //x

    function Mes_demandes() {
    const dispatch = useDispatch();
    const { requests, loading, error } = useSelector((state) => state.adoption);
    //récupere la liste des demande d'adoption
    const user = useSelector((state) => state.user.user);
    const userRequests = requests.filter((r) => r.myid === user._id);

    const animals = useSelector((state) => state.animal?.animalList || []);

    useEffect(() => {
        dispatch(fetchAdoptionRequests());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteAdoptionRequest(id)).then((res) => {
        if (!res.error) {
            toast.success("L'élément a été delete avec succès!", {
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
        <h2>Liste de mes demandes d’adoption</h2>
        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <table
            border="1"
            cellPadding="10"
            style={{ width: "100%", marginTop: "1rem" }}
        >
            <thead>
            <tr>
                <th>propriétaire</th>
                <th>Raison</th>
                <th>Date</th>
                <th>Animal ID</th>
                <th style={{ textAlign: "center" }}>Confirmer l'adoption </th>
                <th style={{ textAlign: "center" }}>Delete</th>
            </tr>
            </thead>
            <tbody>
            {userRequests.map((r) => {
                const animal = animals.find((p) => p._id === r.idanimal);
                return (
                <tr key={r._id}>
                    <td>{r.proprietaire}</td>
                    <td>{r.reason}</td>
                    <td>{new Date(r.createdAt).toLocaleString()}</td>
                    <td>
                    <Link to={`/animaux/${r.idanimal}`}>{r.idanimal}</Link>
                    </td>
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
    );
    }

    export default Mes_demandes;
