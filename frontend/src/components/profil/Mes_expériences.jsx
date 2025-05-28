import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletepost, getpost } from "../../JS/userSlice/postSlice";
import Buttonxp from "./Buttonxp";
import Swal from "sweetalert2";

function Mes_expériences({ ping, setping }) {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const poste = useSelector((state) => state.post?.postlist || []);

    useEffect(() => {
        dispatch(getpost());
    }, [dispatch, ping]); 

    // Filtrage des posts appartenant à l'utilisateur
    const userPosts = poste.filter((el) => el?.userid === user?._id);
      const handleDelete = (id) => {
        Swal.fire({
          title: "Êtes-vous sûr ?",
          text: "Cette action est irréversible !",
          icon: "Attention",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Oui, supprimer",
          cancelButtonText: "Annuler",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(deletepost(id));
            Swal.fire("Supprimé !", "L'élément a été supprimé.", "success");
          }
        });
      };

    return (
        <div>
            <Buttonxp ping={ping} setping={setping} />

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                {userPosts.length > 0 ? (
                    userPosts.map((Expérience) => (
                        <div>
                        <div className="annuler">
                        
                                <button
                                    style={{
                                        border: "none",
                                        background: "none",
                                        position: "absolute",
                                        right: 5,
                                        top: 5,
                                        color: "red",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleDelete(Expérience._id)}
                                >
                                    X
                                </button>
                            

                            <div>
                                <h4 style={{ margin: 25, color: "black" }}>{Expérience?.title}</h4>
                                <p style={{ margin: 20, color: "#6c757d" }}>{Expérience?.content}</p>
                                <p style={{ position: "absolute", bottom: 0, right: 10, color: "#6c757d" }}>{Expérience?.Crea}</p>
                            </div>
                        </div>
                        </div>
                    ))
                ) : (
                    <p style={{ marginTop: 50 }}>Aucune Expérience</p>
                )}
            </div>
        </div>
    );
}

export default Mes_expériences;
