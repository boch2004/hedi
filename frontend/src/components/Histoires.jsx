import React, { useEffect } from "react";
import Cardpost from "./Cardpost";
import { useSelector, useDispatch } from "react-redux";
import { getpost } from "../JS/userSlice/postSlice";
import Modal from "./Modal";

function Histoires({ ping, setping}) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const poste = useSelector((state) => state.post?.postlist || []);

  useEffect(() => {
    dispatch(getpost()); // جلب البيانات عند تحميل الصفحة
  }, [dispatch]);


  return (
    <div>
      {user?.category === "user" && (
      <Modal ping={ping} setping={setping} />
      )}
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",}}>
      {poste.length > 0 ? (
        poste.map((el) => <Cardpost  histoire={el} />)
      ) : (
        <p style={{marginTop:50}}>Aucune Histoire</p>
      )}
      </div>
    </div>
  );
}

export default Histoires;
