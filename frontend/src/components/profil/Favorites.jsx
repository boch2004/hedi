import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deletefavoris, getfavoris } from "../../JS/userSlice/favorisslice";

function Favorites({ ping, setping }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getfavoris());
    }, [dispatch, ping]);

    const favoris = useSelector((state) => state.favoris.favorislist);
    const user = useSelector((state) => state.user.user);

    //le user n'a pas connécté ou n'a pas un compte s'affiche sil click sur favorite 
    const handleClick = (e, el) => {
        if (!user) {
            e.preventDefault();
            Swal.fire({
                icon: "Attention",
                title: "Connectez-vous d'abord",
                text: "Une erreur s'est produite :",
            });
        } else {
            window.scrollTo(0, 0);
        }
    };


    const handleDelete = (elId, e) => {
        e.stopPropagation(); 
        dispatch(deletefavoris(elId));
        setping(prev => !prev);
    };

    return (
        <div className="favorites-container">
            {favoris && favoris.filter((el) => el.iduser === user?._id).length === 0 ? (
                <p className="empty-favorites-message">Votre liste de favoris est vide.</p>
            ) : (
                favoris
                    ?.filter((el) => el.iduser === user?._id)
                    .map((el) => (
                        <div
                            className="favorite-item"
                            key={el._id}
                            style={{
                                transition: "all 0.5s ease-in-out",
                                transform: "translateY(0px)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-12px)";
                                e.currentTarget.style.boxShadow = "0px 10px 30px rgba(0, 0, 0, 0.3)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0px)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <Link
                                to={user ? `/animaux/${el.idurl}` : "#"}
                                onClick={(e) => handleClick(e, el)}
                            >
                                <img
                                style={{ width: "200px", height: "200px" }}
                                    src={`back-adoption-production.up.railway.app/uploads/${el.imganimal}`}
                                    className="favorite-image"
                                    alt={el?.name}
                                />
                            </Link>
                            <h5 className="favorite-title">{el?.nameanimal}</h5>
                            <div className="favorite-buttons">
                                <button
                                    onClick={(e) => handleDelete(el?._id, e)}
                                    className="delete-button"
                                >
                                    🤍
                                </button>
                            </div>

                        </div>
                    ))
            )}
        </div>
    );
}

export default Favorites;
