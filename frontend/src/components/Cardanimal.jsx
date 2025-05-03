import { useDispatch, useSelector } from "react-redux";
import { deleteanimal, editanimal } from "../JS/userSlice/animalSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { addfavoris, deletefavoris } from "../JS/userSlice/favorisslice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "./Cardanimal.css";


function Cardanimal({ animal, ping, setping }) {
  const user = useSelector((state) => state.user.user);
  const favoris = useSelector((state) => state.favoris.favorislist);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer !"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteanimal(id));
      }
    });
  };

  if (!animal) return <p>animal not found</p>;

  const [newfavoris, setnewfavoris] = useState({
    iduser: user?._id,
    nameuser: user?.name + " " + user?.lastname,
    nameanimal: animal?.name,
    imganimal: "",
    description: "",
    idurl: animal?._id || "",
  });

  useEffect(() => {
    if (animal && user) {
      setnewfavoris({
        iduser: user._id,
        nameuser: `${user.name} ${user.lastname}`,
        nameanimal: animal.name,
        imganimal: animal.img,
        idurl: animal?._id || "",
      });

      // Check if already in favoris
      const isLiked = favoris?.some(
        (fav) => animal._id === fav.idurl && fav.iduser === user._id
      );
      setLiked(isLiked);
    }
  }, [animal, user, favoris]);

  const handleLikeClick = () => {
    if (liked) {
      const favToDelete = favoris.find(
        (f) => f.idurl === animal._id && f.iduser === user._id
      );
      if (favToDelete) {
        dispatch(deletefavoris(favToDelete._id));
       
      }
    } else {
      dispatch(addfavoris(newfavoris));
     
    }
    setLiked(!liked);
    setping(prev => !prev);
  };
  return (
    <div style={{ position: "relative", borderRadius: 8 }}>
      {user?.category === "admin" && (
        <button
          style={{
            border: "none",
            background: "transparent",
            position: "absolute",
            right: 20,
            top: 15,
            color: "red",
            fontSize: 27,
            cursor: "pointer",
          }}
          onClick={() => handleDelete(animal._id)}
        >
          ×
        </button>
      )}
      <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/animaux/${animal._id}`}>
        <div className="animal-card">
          <div>
            {user?.category !== "admin" && 

<svg
  onClick={(e) => {
    if (!user) {
      e.stopPropagation();
      e.preventDefault();
      Swal.fire({
        icon: "warning",
        title: "You must log in first",
        text: "You need to be logged in to like an animal.",
        confirmButtonText: "Go to Login"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });      
    } else {
      e.preventDefault();
      e.stopPropagation();
      handleLikeClick();
    }
  }}
  className={liked ? "heart liked" : "heart"}
  style={{
    position: "absolute",
    right: 0,
    margin: "13px 25px",
    cursor: "pointer",
  }}
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M11.4295 3.29074L12.024 3.73295L12.6201 3.29292C13.8781 2.36439 15.4265 1.91606 16.9859 2.02881C18.5435 2.14143 20.0096 2.80633 21.1204 3.90373C21.7231 4.51528 22.1994 5.23968 22.5219 6.03551C22.8451 6.83312 23.0075 7.68673 22.9997 8.5473C22.992 9.40787 22.8143 10.2584 22.4767 11.0501C22.1392 11.8417 21.6486 12.5589 21.033 13.1603L13.8181 20.4352C13.3285 20.9234 12.6674 21.1966 11.9782 21.1966C11.289 21.1966 10.628 20.9234 10.14 20.4368L2.93462 13.1714C1.75712 12.0021 1.06956 10.4373 1.005 8.78674C0.940433 7.13618 1.50366 5.52246 2.58126 4.27054C3.65886 3.01862 5.17079 2.2215 6.81257 2.0397C8.45436 1.8579 10.1041 2.30492 11.4295 3.29074Z"
    fill={liked ? "#EF89B8" : "#FDFBFF"}
    stroke={liked ? "#EF89B8" : "#aaa"}
    strokeWidth="2"
  />
              </svg>}
            <img
              style={{ width: 224, height: 236 }}
              src={`http://localhost:5000/uploads/${animal.img}`}
              alt={animal?.name}
            />
          </div>
          <div className="animal-sec">
            <div className="animal-desc">
              <div style={{ background: "#1dc693", borderRadius: 20, width: 80,height:28, color: "white",position:"relative",top:-12,fontSize:14,alignItems:"center",display:"flex",justifyContent:"center" }}><span>{animal?.adoption ? "Non disponible" : "Disponible"}</span></div>
              </div>
            <h2>{animal.name}</h2>
            <span className="h1name">{animal.age}</span>
          <div style={{width:202,height:26 ,background:"#fbf7ff",marginBottom:5,borderRadius:8,display:"flex",justifyContent:"center",alignItems:"center"}}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.1078 9.89352C11.8672 9.20719 11.3064 8.85938 10.765 8.52305C10.2938 8.2302 9.84896 7.95348 9.55802 7.45664C8.75603 6.08043 8.31552 5.25 7.00165 5.25C5.68779 5.25 5.24591 6.0807 4.44201 7.45637C4.1508 7.9543 3.70373 8.23156 3.23205 8.52496C2.69064 8.86156 2.13092 9.20855 1.88947 9.89352C1.7955 10.1405 1.74822 10.4028 1.75002 10.6671C1.75002 11.7811 2.63732 12.6875 3.62033 12.6875C4.60334 12.6875 5.89833 12.1918 7.00439 12.1918C8.11044 12.1918 9.38739 12.6875 10.3827 12.6875C11.378 12.6875 12.25 11.7811 12.25 10.6671C12.2508 10.4027 12.2026 10.1404 12.1078 9.89352Z" fill="#533778"></path>
<path d="M1.96875 7.875C2.81444 7.875 3.5 6.99356 3.5 5.90625C3.5 4.81894 2.81444 3.9375 1.96875 3.9375C1.12306 3.9375 0.4375 4.81894 0.4375 5.90625C0.4375 6.99356 1.12306 7.875 1.96875 7.875Z" fill="#533778"></path>
<path d="M5.03125 5.25C5.87694 5.25 6.5625 4.36856 6.5625 3.28125C6.5625 2.19394 5.87694 1.3125 5.03125 1.3125C4.18556 1.3125 3.5 2.19394 3.5 3.28125C3.5 4.36856 4.18556 5.25 5.03125 5.25Z" fill="#533778"></path>
<path d="M8.96875 5.25C9.81444 5.25 10.5 4.36856 10.5 3.28125C10.5 2.19394 9.81444 1.3125 8.96875 1.3125C8.12306 1.3125 7.4375 2.19394 7.4375 3.28125C7.4375 4.36856 8.12306 5.25 8.96875 5.25Z" fill="#533778"></path>
<path d="M12.0312 7.875C12.8769 7.875 13.5625 6.99356 13.5625 5.90625C13.5625 4.81894 12.8769 3.9375 12.0312 3.9375C11.1856 3.9375 10.5 4.81894 10.5 5.90625C10.5 6.99356 11.1856 7.875 12.0312 7.875Z" fill="#533778"></path>
            </svg><span style={{ color: "#533778" }} >{animal.race}</span></div>

<div style={{width:202,height:26 ,background:"#fbf7ff",borderRadius:8,display:"flex",justifyContent:"center",alignItems:"center"}}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.83332 9.04189C6.60687 9.04189 7.34874 8.7346 7.89572 8.18762C8.4427 7.64064 8.74999 6.89877 8.74999 6.12522C8.74999 5.35167 8.4427 4.6098 7.89572 4.06282C7.34874 3.51583 6.60687 3.20854 5.83332 3.20854C5.05977 3.20854 4.31791 3.51583 3.77093 4.06282C3.22395 4.6098 2.91666 5.35167 2.91666 6.12522C2.91666 6.89877 3.22395 7.64064 3.77093 8.18762C4.31791 8.7346 5.05977 9.04189 5.83332 9.04189ZM9.34091 4.03338C9.68518 4.61084 9.8816 5.26435 9.91272 5.93592C9.94385 6.6075 9.80872 7.27638 9.51933 7.8832C9.22994 8.49003 8.79524 9.01604 8.25379 9.41456C7.71235 9.81308 7.0809 10.0718 6.41549 10.1677L6.41666 10.2086V10.7919H6.99999C7.1547 10.7919 7.30307 10.8534 7.41247 10.9628C7.52186 11.0721 7.58332 11.2205 7.58332 11.3752C7.58332 11.5299 7.52186 11.6783 7.41247 11.7877C7.30307 11.8971 7.1547 11.9586 6.99999 11.9586H6.41666V12.5419C6.41666 12.6966 6.3552 12.845 6.2458 12.9544C6.13641 13.0638 5.98803 13.1252 5.83332 13.1252C5.67861 13.1252 5.53024 13.0638 5.42084 12.9544C5.31145 12.845 5.24999 12.6966 5.24999 12.5419V11.9586H4.66666C4.51195 11.9586 4.36357 11.8971 4.25418 11.7877C4.14478 11.6783 4.08332 11.5299 4.08332 11.3752C4.08332 11.2205 4.14478 11.0721 4.25418 10.9628C4.36357 10.8534 4.51195 10.7919 4.66666 10.7919H5.24999V10.2086C5.24999 10.1946 5.24999 10.1811 5.25116 10.1677C4.23103 10.0183 3.30517 9.48851 2.65936 8.6848C2.01356 7.88109 1.69559 6.86288 1.76927 5.83449C1.84295 4.8061 2.30282 3.84362 3.0566 3.14018C3.81038 2.43674 4.8023 2.0444 5.83332 2.04187C6.85919 2.04062 7.84771 2.42666 8.60124 3.12279L9.68041 2.04362H8.75582C8.60111 2.04362 8.45274 1.98216 8.34334 1.87277C8.23395 1.76337 8.17249 1.615 8.17249 1.46029C8.17249 1.30558 8.23395 1.1572 8.34334 1.04781C8.45274 0.938411 8.60111 0.876953 8.75582 0.876953H11.0892C11.2439 0.876953 11.3922 0.938411 11.5016 1.04781C11.611 1.1572 11.6725 1.30558 11.6725 1.46029V3.79363C11.6725 3.94834 11.611 4.09671 11.5016 4.20611C11.3922 4.31551 11.2439 4.37696 11.0892 4.37696C10.9344 4.37696 10.7861 4.31551 10.6767 4.20611C10.5673 4.09671 10.5058 3.94834 10.5058 3.79363V2.86846L9.34149 4.03338H9.34091Z" fill="#533778"></path>
            </svg><span style={{ color: "#533778" }} >{animal.gender}</span></div>

        </div>
      </div>
         </Link>
   
    </div>
  
  );
}

export default Cardanimal;