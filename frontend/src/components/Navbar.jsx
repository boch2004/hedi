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
      <Navbar bg="success" variant="dark" expand="lg" className="small-navbar">
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
            <Nav.Link as={Link} to="/" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/nous" className="text-white">
              À propos de nous
            </Nav.Link>
            <Nav.Link as={Link} to="/conseil" className="text-white">
              Conseils
            </Nav.Link>
            <Nav.Link as={Link} to="/histoire" className="text-white">
              Histoires
            </Nav.Link>
            <Nav.Link as={Link} to="/Adoption" className="text-white">
              S'adopter
            </Nav.Link>
            {user && (
             <Nav.Link as={Link} to="/Ajouter" className="text-white">
              Ajouter un animal 
            </Nav.Link>
            )}
            {!user && (
              <Nav.Link as={Link} to="/Login" className="text-white">
                Se connecter
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        {user && (
          <Nav.Link as={Link} to="/profil" className="text-white">
            Profil
          </Nav.Link>
          
        )}
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
