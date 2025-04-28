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

    const handleClick = (e, el) => {
        if (!user) {
            e.preventDefault();
            Swal.fire({
                icon: "warning",
                title: "You must log in first",
                text: "Something went wrong!",
            });
        } else {
            window.scrollTo(0, 0);
        }
    };

    const handleDelete = (elId, e) => {
        e.stopPropagation(); // Prevent the link from being followed
        dispatch(deletefavoris(elId));
        setping(!ping);
    };

    return (
        <div className="favorites-container">
            {favoris && favoris.filter((el) => el.iduser === user?._id).length === 0 ? (
                <p className="empty-favorites-message">Your favorites list is empty.</p>
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
                                    src={`http://localhost:5000/uploads/${el.imganimal}`}
                                    className="favorite-image"
                                    alt={el?.nameproduct}
                                />
                            </Link>
                            <h5 className="favorite-title">{el?.nameuser}</h5>
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
