    import React, { useState } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { addanimal } from "../JS/userSlice/animalSlice";
    import Swal from "sweetalert2";
    import "./Bouton.css";

    function Ajouter() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [newanimal, setnewanimal] = useState({
        titel: "",
        img: "", // سيتم تخزين id الصورة التي تم رفعها
        name: "",
        description: "",
        race: "",
        age: "",
        gender: "",
        location: "",
        remarque: "",
        idanimal: user?._id,
    });

    // دالة للتحقق من الحقول
    const isFormValid = () => {
        return (
        newanimal.titel &&
        newanimal.img &&
        newanimal.name &&
        newanimal.description &&
        newanimal.race &&
        newanimal.gender &&
        newanimal.location
        );
    };

    return (
        <div>
        <div style={{ display: "flex" }}>
            <div
            style={{
                backgroundImage: `url("https://www.la-spa.fr/app/app/uploads/2023/09/prendre-soin_mon-chien-saute-sur-les-gens.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "50%",
                height: "126vh",
            }}
            ></div>
            <div
            style={{
                backgroundColor: "#efeff1",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "50%",
                height: ": 100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: 50,
            }}
            className="inputt"
            >
            <h1>Add your Animal</h1>

            <h5>
                Add title<span style={{ color: "red" }}>*</span>
            </h5>
            <input
                type="text"
                onChange={(e) =>
                setnewanimal({ ...newanimal, titel: e.target.value })
                }
            />

<h5>Add image</h5>
<input
  type="file"
  accept="image/*"
  onChange={(e) => setnewanimal({ ...newanimal, img: e.target.files[0] })}
/>

            <h5>
                Add description<span style={{ color: "red" }}>*</span>
            </h5>
            <input
                type="text"
                onChange={(e) =>
                setnewanimal({ ...newanimal, description: e.target.value })
                }
            />

            <h5>
                Add name<span style={{ color: "red" }}>*</span>
            </h5>
            <input
                type="text"
                onChange={(e) =>
                setnewanimal({ ...newanimal, name: e.target.value })
                }
            />

            <h5>
                Add race<span style={{ color: "red" }}>*</span>
            </h5>
            <input
                type="text"
                onChange={(e) =>
                setnewanimal({ ...newanimal, race: e.target.value })
                }
            />

            <h5>
                Add gender<span style={{ color: "red" }}>*</span>
            </h5>
            <input
                type="text"
                onChange={(e) =>
                setnewanimal({ ...newanimal, gender: e.target.value })
                }
            />

            <h5>
                Add location<span style={{ color: "red" }}>*</span>
            </h5>
            <input
                type="text"
                onChange={(e) =>
                setnewanimal({ ...newanimal, location: e.target.value })
                }
            />

            <h5>
                Add age<span style={{ color: "red" }}>*</span>
            </h5>
            <input
                type="number"
                onChange={(e) =>
                setnewanimal({ ...newanimal, age: e.target.value })
                }
            />

            <h5>
                Add remarque<span style={{ color: "red" }}>*</span>
            </h5>
            <input
                type="text"
                onChange={(e) =>
                setnewanimal({ ...newanimal, remarque: e.target.value })
                }
            />

            <div className="wrapper">
                <a
               onClick={() => {
                if (isFormValid()) {
                  const formData = new FormData();
                  formData.append("titel", newanimal.titel);
                  formData.append("img", newanimal.img); // الصورة كـ File
                  formData.append("name", newanimal.name);
                  formData.append("description", newanimal.description);
                  formData.append("race", newanimal.race);
                  formData.append("age", newanimal.age);
                  formData.append("gender", newanimal.gender);
                  formData.append("location", newanimal.location);
                  formData.append("remarque", newanimal.remarque);
                  formData.append("idanimal", newanimal.idanimal);
              
                  dispatch(addanimal(formData));
              
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                } else {
                  Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Please fill all the fields",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              }}
              
                >
                <span>Save Changes</span>
                </a>
            </div>
            </div>
        </div>
        </div>
    );
    }

    export default Ajouter;
