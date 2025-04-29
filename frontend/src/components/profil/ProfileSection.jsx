  import React, { useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import Swal from "sweetalert2";
  import "../UserProfile.css";
import { deleteuser, edituser } from "../../JS/userSlice/userSlice";
  const ProfileSection = ({ping,setping}) => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [edited, setEdited] = useState({
      name: user?.name || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
      password: user?.password || "",
      img: user?.img || "",
      phone: user?.phone || "",
      postalCode: user?.postalCode,
      location: user?.location,
    });

    useEffect(() => {
      if (user) {
        setEdited({
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          img: user.img,
          phone: user.phone,
          postalCode: user.postalCode,
          location: user.location,
        });
      }
    }, [user]);

    const handleDelete = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteuser(user._id));
          Swal.fire("Deleted!", "Your account has been deleted.", "success");
          navigate("/login");
          setping(prev => !prev);
        }
      });
    };

    const handleSaveChanges = () => {
      dispatch(edituser({ id: user._id, edited }));
    };

    return (
      <div className="interface-profile">
        {/* Profile Section */}
        <div className="profile-header">
          <img
            src={
              user?.img ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnBLMyaL-5gh0nhP-vircgmtkHER58KHoMAw&s"
            }
            alt="Profile"
            className="profile-img"
          />
        </div>

        <div className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-input"
                name="name"
                value={edited.name}
                onChange={(e) => setEdited({ ...edited, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Lastname</label>
              <input
                type="text"
                className="form-input"
                name="lastname"
                value={edited.lastname}
                onChange={(e) =>
                  setEdited({ ...edited, lastname: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-input"
                name="email"
                value={edited.email}
                onChange={(e) => setEdited({ ...edited, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                className="form-input"
                name="phone"
                value={edited.phone || ""}
                onChange={(e) => setEdited({ ...edited, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                className="form-input"
                name="location"
                value={edited.location || ""}
                onChange={(e) =>
                  setEdited({ ...edited, location: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                className="form-input"
                name="postalCode"
                value={edited.postalCode || ""}
                onChange={(e) =>
                  setEdited({ ...edited, postalCode: e.target.value })
                }
              />
            </div>
          </div>

          <button
            className="btn-save"
            onClick={() => {
              handleSaveChanges();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your changes have been saved",
                showConfirmButton: false,
                timer: 1500,
              });
            }}
          >
            Save Changes
          </button>
          <button className="btn-delete" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    );
  };

  export default ProfileSection;
