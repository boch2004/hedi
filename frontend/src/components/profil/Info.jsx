import React from "react";
import { useSelector } from "react-redux";

function Info() {
  const user = useSelector((state) => state.user.user);

  return (
    <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
      <img
        src={
          user?.img ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnBLMyaL-5gh0nhP-vircgmtkHER58KHoMAw&s"
        }
      />
      <h1>
        {user?.name} {user?.lastname}{" "}
      </h1>
      <h1>{user?.email} </h1>
      <h1>{user?.phone} </h1>
      <h1>{user?.location} </h1>
      <h1>{user?.postalCode} </h1>

    </div>
  );
}

export default Info;
