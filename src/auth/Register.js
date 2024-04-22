import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import Swal from "sweetalert2";

function Register() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [validation, setValidation] = useState({
    email: true,
    password: true,
    username: true,
  });

  async function register() {
    if (loading) return;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setValidation((prevValidation) => ({ ...prevValidation, email: false }));
      Swal.fire("Peringatan", "Format email tidak valid", "warning");
      return;
    }

    if (password.length < 8) {
      setValidation((prevValidation) => ({
        ...prevValidation,
        password: false,
      }));
      Swal.fire("Peringatan", "Password harus minimal 8 karakter", "warning");
      return;
    }

    if (password !== cpassword) {
      setValidation((prevValidation) => ({
        ...prevValidation,
        password: false,
      }));
      Swal.fire("Peringatan", "Kata sandi tidak cocok", "warning");
      return;
    }

    if (!username) {
      setValidation((prevValidation) => ({
        ...prevValidation,
        username: false,
      }));
      Swal.fire("Peringatan", "Nama wajib diisi", "warning");
      return;
    }
    setLoading(true);

    const user = {
      username,
      email,
      password,
      cpassword,
    };

    try {
      const result = await axios.post(
        `https://grafikserver.vercel.app/register`,

        user
      ).data;
      setName("");
      setEmail("");
      setPassword("");
      setCPassword("");
      console.log(result);
      Swal.fire("Selamat", "Registrasi Berhasil", "success").then((result) => {
        window.location.href = "/login";
      });
    } catch (error) {
      Swal.fire("Oops", "Terjadi kesalahan", "error");
      console.error("Kesalahan registrasi:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="register">
      <div className="tampilanhome">
        <Row className="justify-content-md-center">
          <Col>
              <Card className="cardmodal">
                <Card.Body>
                  <Card.Title className="text-center">
                    <h2>Register</h2>
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
                          setName(e.target.value);
                          setValidation((prevValidation) => ({
                            ...prevValidation,
                            username: e.target.value.length > 0,
                          }));
                        }}
                      />
                      {!validation.username && (
                        <Form.Text className="text-danger">
                          Username wajib diisi
                        </Form.Text>
                      )}
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email"
                      className="mb-3"
                    >
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setValidation((prevValidation) => ({
                            ...prevValidation,
                            email: /^\S+@\S+\.\S+$/.test(e.target.value),
                          }));
                        }}
                      />
                      {!validation.email && (
                        <Form.Text className="text-danger">
                          Format email tidak valid
                        </Form.Text>
                      )}
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="floatingInput"
                      label="Password"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setValidation((prevValidation) => ({
                            ...prevValidation,
                            password: e.target.value.length >= 8,
                          }));
                        }}
                      />
                      {!validation.password && (
                        <Form.Text className="text-danger">
                          Password harus minimal 8 karakter
                        </Form.Text>
                      )}
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="floatingInput"
                      label="Password"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={cpassword}
                        onChange={(e) => setCPassword(e.target.value)}
                      />
                      {cpassword !== password && (
                        <Form.Text className="text-danger">
                          Confirm Password harus sama dengan Password
                        </Form.Text>
                      )}
                    </FloatingLabel>

                    <Button
                      className="btnreg btn btn-block"
                      onClick={register}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Daftar"}
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Register;
