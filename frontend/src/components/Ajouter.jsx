import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { addanimal } from '../JS/userSlice/animalSlice';
import Swal from 'sweetalert2';
import "./Bouton.css"


function Ajouter() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [newanimal, setnewanimal] = useState({
        titel: "",
        img: "",
        description: "",
        Ingredients: "",
        Directions: "",
        chef: user?.name + " " + user?.lastname,
        idchef: user?._id

    })
    return (
        <div>
            <div style={{ display: "flex" }}>
                <div style={{
                    backgroundImage: `url("https://foodu-react.vercel.app/assets/img/banner/1.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "50%",
                    height: "110vh" 
                }}>

                </div>
                <div style={{
                    backgroundColor: "white",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "50%",
                    height: ": 100vh",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 50

                }}
                    className='inputt' >
                    <h1>Add your Animal</h1>

                    <h5>Add title</h5>
                    <input type="text" onChange={(e) => setnewanimal({ ...newanimal, titel: e.target.value })} />

                    <h5>Add image</h5>
                    <input type="text" onChange={(e) => setnewanimal({ ...newanimal, img: e.target.value })} />

                    <h5>Add description</h5>
                    <input type="text" onChange={(e) => setnewanimal({ ...newanimal, description: e.target.value })} />

                    <h5>Add name</h5>
                    <input type="text" onChange={(e) => setnewanimal({ ...newanimal, name: e.target.value })} />
                    
                    <h5>Add race</h5>
                    <input type="text" onChange={(e) => setnewanimal({ ...newanimal, race: e.target.value })} />

                    <h5>Add gender</h5>
                    <input type="text" onChange={(e) => setnewanimal({ ...newanimal, gender: e.target.value })} />

                    <h5>Add location</h5>
                    <input type="text" onChange={(e) => setnewanimal({ ...newanimal, location: e.target.value })} />
                    
                    <div class="wrapper">
                        <a onClick={() => {
                            dispatch(addanimal(newanimal)); Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Has been saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }}><span>Save Changes</span></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ajouter