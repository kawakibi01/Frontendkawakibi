import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Swal from "sweetalert2";

const NavbarPage = () => {
  const users = JSON.parse(sessionStorage.getItem("users"));

  function logout(event) {
    event.preventDefault();
    Swal.fire({
      title: "Logout",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("users");
        Swal.fire("Okay", "Logout Berhasil", "success").then(() => {
          window.location.href = "/";
        });
      }
    });
  }

  return (
    <Navbar expand="lg">
      <Container>
        {users && (
          <Navbar.Brand href="/home">
            <Nav.Link href="/home">Home</Nav.Link>
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto right">
            {users ? (
              <>
                <NavDropdown title="Node" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/home">KandangSapi</NavDropdown.Item>
                  <NavDropdown.Item href="/sekitar">
                    SekitarKandangSapi
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Grafik " id="basic-nav-dropdown">
                  <NavDropdown.Item href="/tampilangrafik">
                    Kandang Sapi
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/tampilangrafik2">
                    Sekitar Kandang Sapi
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Filter " id="basic-nav-dropdown">
                  <NavDropdown.Item href="/tampilanhari">
                    Kandang Sapi
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/tampilanhari2">
                    Sekitar Kandang Sapi
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title={users.username} id="basic-nav-dropdown">
                  <NavDropdown.Item href="" onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPage;
