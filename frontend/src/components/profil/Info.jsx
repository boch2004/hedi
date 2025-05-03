import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa"; 
import { edituser, uploadAndEditUserImage } from "../../JS/userSlice/userSlice";

function ProfileInfo() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && user?._id) {
      const action = await dispatch(uploadAndEditUserImage({ imageFile: file }));

      if (uploadAndEditUserImage.fulfilled.match(action)) {
        const imageUrl = action.payload?.img;

        if (imageUrl) {
          // نبعث فقط img لكن تنجم تزيد بيانات أخرى
          dispatch(edituser({ id: user._id, edited: { img: imageUrl } }));
        }
      }
    }
  };
  

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          src={
            user?.img ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnBLMyaL-5gh0nhP-vircgmtkHER58KHoMAw&s"
          }
          alt="User"
          onClick={handleImageClick}
          title="Click to change profile picture"
          style={{
            borderRadius: "50%",
            width: "120px",
            height: "120px",
            objectFit: "cover",
            cursor: "pointer",
            opacity: status === "pending" ? 0.4 : 1,
            transition: "opacity 0.3s ease",
          }}
        />
        {status === "pending" && (
          <FaSpinner
            className="spinner"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              fontSize: "28px",
              color: "#333",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*"
      />
      <h2>{user?.name} {user?.lastname}</h2>

      {/* Spinner CSS */}
      <style>
        {`
          .spinner {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default ProfileInfo;
