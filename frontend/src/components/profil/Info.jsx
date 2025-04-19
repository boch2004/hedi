import React from "react";
import { useSelector } from "react-redux";

function Info() {
  const user = useSelector((state) => state.user.user);

  return (
    <div  style={{display:"flex",justifyContent:"center",}}>
    <div style={{display:"flex",justifyContent:"center",flexDirection:"column",}}>
      <div style={{display:"flex",justifyContent:"center",}}>
      <img
      style={{borderRadius:"50%"}}
        src={
          user?.img ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnBLMyaL-5gh0nhP-vircgmtkHER58KHoMAw&s"
        }
      />
      </div>
      <h1>
        nom:&nbsp; 
        {user?.name} {user?.lastname}{" "}
      </h1>
      <h1>
        Email:&nbsp;
        {user?.email} </h1>
      <h1>
      phone:&nbsp;
        {user?.phone} </h1>
      <h1>
      location:&nbsp;
        {user?.location} </h1>
      <h1>
      postalCode:&nbsp;
        {user?.postalCode} </h1>
        </div>
    </div>
  );
}

export default Info;
