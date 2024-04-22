import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
// import logo from "../../assets/logo.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function Login() {
    if (loading) return;
    if (!username || !password) {
      Swal.fire(
        "Peringatan",
        "Harap isi semua kolom yang diperlukan",
        "warning"
      );
      return;
    }

    if (password.length < 8) {
      Swal.fire("Peringatan", "Password harus minimal 8 karakter", "warning");
      return;
    }
    setLoading(true);
    const user = {
      username,
      password,
    };
    console.log(user);
    try {
      const result = (await axios.post(`https://grafikserver.vercel.app/login`, user))
        .data;
      Swal.fire("Okay", "Login Berhasil", "success").then((result) => {
        window.location.href = "/home";
      });
      sessionStorage.setItem("users", JSON.stringify(result));
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          Swal.fire("Oops", "Something went wrong", "error");

        } else {
          Swal.fire("Oops", "Something went wrong", "error");
        }
      } else if (error.request) {
      } else {
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="login">
      <Row className="justify-content-center">
        <Col >
          <Card className="cardmodal">
            <Card.Body>
              <Card.Title className="text-center">
                <h2>Login</h2>
              </Card.Title>
              <Card.Text>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingInput"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Password (minimal 8 karakter)"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    minLength="8"
                  />
                  {password.length > 0 && password.length < 8 && (
                    <Form.Text className="text-danger">
                      Password harus minimal 8 karakter
                    </Form.Text>
                  )}
                </FloatingLabel>

                <Button
                  className="btnlogin btn btn-block"
                  onClick={Login}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Masuk"}
                </Button>
                <div className="mt-2 text-center" style={{ color: "black" }}>
                  <Link to="/register" className="links">
                    Register ? 
                  </Link>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
