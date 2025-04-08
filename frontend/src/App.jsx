import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Conseil from "./components/Conseil";
import Login from "./components/Login";
import Profil from "./components/Profil";
import Register from "./components/Register";
import PrivateRoute from "./Routes/PrivateRouter";
import Pronous from "./components/Pronous";
import Adoption from "./components/Adoption";
import Ajouter from "./components/Ajouter";
import Histoires from "./components/Histoires";
import ProfileSection from "./components/profil/ProfileSection";
import Info from "./components/profil/Info";
import Les_utlisateurs from "./components/profil/Les_utlisateurs";
import Myrecipes from "./components/profil/Myrecipes";
import { useDispatch, useSelector } from "react-redux";
import { getusers, userCurrent } from "./JS/userSlice/userSlice";
import { getanimal } from "./JS/userSlice/animalSlice";
import { getpost } from "./JS/userSlice/postSlice";



function App() {
  const dispatch = useDispatch();
  const [ping, setping] = useState(false)
  useEffect(() => {
    dispatch(userCurrent());
    dispatch(getanimal());
    dispatch(getusers());
    dispatch(getpost());
  }, [ping])


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Pricing" element={<Conseil />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Nous" element={<Pronous />} />
        <Route path="/Conseil" element={<Conseil />} />
        <Route path="/Ajouter" element={<Ajouter />} />
        <Route path="/histoire" element={<Histoires ping={ping} setping={setping} />} />        
        <Route path="/Adoption" element={<Adoption />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profil/" element={<Profil />}>
            <Route path="info" element={<Info />} />
            <Route path="" element={<ProfileSection />} />
            <Route path="Les_utlisateurs" element={<Les_utlisateurs ping={ping} setping={setping}   />} />
            <Route path="Myrecipes" element={<Myrecipes ping={ping} setping={setping} />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
