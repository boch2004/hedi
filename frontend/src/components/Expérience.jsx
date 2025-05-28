import React, { useEffect } from "react";
import Cardpost from "./Cardpost";
import { useSelector, useDispatch } from "react-redux";
import { getpost } from "../JS/userSlice/postSlice";


function Expérience() {
  const dispatch = useDispatch();
  const poste = useSelector((state) => state.post?.postlist || []);

  useEffect(() => {
    dispatch(getpost()); 
  }, [dispatch]);


  return (
    <div>
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",}}>
      {poste.length > 0 ? (
          poste.map((el) => <Cardpost Expérience={el} />)
      ) : (
            <p style={{ marginTop: 50 }}>Aucune Expérience</p>
      )}
      </div>
    </div>
  );
}

export default Expérience;
