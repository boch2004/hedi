import { useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { userCurrent } from "../JS/userSlice/userSlice";

function ColorSchemesExample() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(userCurrent());
    }
  }, [dispatch]);

  return (
    <>
      <Navbar variant="dark" expand="lg" className="small-navbar">
        <Navbar.Brand as={Link} to="/">
          <img
            style={{ marginTop: 5 }}
            src="/logo.png"
            alt="Logo"
            className="small-logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="roboto text-white">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/nous" className=" roboto text-white">
              À propos de nous
            </Nav.Link>
            <Nav.Link as={Link} to="/conseil" className="roboto text-white">
              Conseils
            </Nav.Link>
            <Nav.Link as={Link} to="/Expérience" className="roboto text-white">
              Expérience
            </Nav.Link>
            <Nav.Link as={Link} to="/Adoption" className="roboto text-white">
              Adopter
            </Nav.Link>
            {!user && (
              <Nav.Link as={Link} to="/Login" className="roboto text-white">
                Se connecter
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        {user && (
          <Nav.Link as={Link} to="/profil/info" className="roboto text-white">
             <img
             style={{width:35, height:35,border:"none"}}
            src={
              user?.img ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnBLMyaL-5gh0nhP-vircgmtkHER58KHoMAw&s"}
            alt="Profile"
            className="profile-img"
          />
          </Nav.Link>
          
        )}
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
