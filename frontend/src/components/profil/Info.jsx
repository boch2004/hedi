import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { edituser, uploadAndEditUserImage } from "../../JS/userSlice/userSlice";
import { Link } from "react-router";

function ProfileInfo() {
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
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
          dispatch(edituser({ id: user._id, edited: { img: imageUrl } }));
        }
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="image-container" onClick={handleImageClick}>
          <img
            src={
              user?.img ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnBLMyaL-5gh0nhP-vircgmtkHER58KHoMAw&s"
            }
            alt="User"
            className="profile-img"
            title="Click to change profile picture"
            style={{ opacity: status === "pending" ? 0.4 : 1 }}
          />
          {status === "pending" && (
            <FaSpinner className="spinner" />
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*"
        />

        <h2 className="username">{user?.name} {user?.lastname}</h2>
        <div className="info">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Téléphone:</strong> {user?.phone}</p>
          <p><strong>Ville:</strong> {user?.location}</p>
          <p><strong>Code postal:</strong> {user?.postalCode}</p>
          <Link to={"/profil"}><button style={{height:40}} className="info-button">Modifier</button></Link>
        </div>
      </div>

      <style>{`
        .profile-container {
          display: flex;
          justify-content: center;
          margin-top: 40px;
        }

        .profile-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 30px;
          width: 350px;
          text-align: center;
          transition: 0.3s ease;
        }

        .profile-card:hover {
          box-shadow: 0 6px 18px rgba(0,0,0,0.15);
        }

        .image-container {
          position: relative;
          display: inline-block;
          cursor: pointer;
        }

        .profile-img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #f76c2f;
        }

        .spinner {
          animation: spin 1s linear infinite;
          font-size: 28px;
          color: #333;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .username {
          margin-top: 15px;
          margin-bottom: 10px;
          font-size: 22px;
          color: #333;
        }

        .info p {
          margin: 6px 0;
          color: #555;
          font-size: 16px;
        }

        .info p strong {
          color: #f76c2f;
        }
      `}</style>
    </div>
  );
}

export default ProfileInfo;
