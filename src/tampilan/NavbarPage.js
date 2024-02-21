import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavbarPage = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="">
          <Nav.Link href="/home">Home</Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto right">
  
            <NavDropdown title="Node" id="basic-nav-dropdown">
              <NavDropdown.Item href="/home">KandangSapi</NavDropdown.Item>
              <NavDropdown.Item href="/sekitar">SekitarKandangSapi</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Grafik " id="basic-nav-dropdown">
              <NavDropdown.Item href="/tampilangrafik">Kandang Sapi</NavDropdown.Item>
              <NavDropdown.Item href="/tampilangrafik2">Sekitar Kandang Sapi</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Filter " id="basic-nav-dropdown">
              <NavDropdown.Item href="/tampilanhari">Kandang Sapi</NavDropdown.Item>
              <NavDropdown.Item href="/tampilanhari2">Sekitar Kandang Sapi</NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPage;
