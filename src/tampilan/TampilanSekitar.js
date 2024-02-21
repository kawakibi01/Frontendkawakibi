import { Card, Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";

function TampilanSekitar() {
  return (
    <Container>
      <h1 className="judul text-center">Sekitar Kandang Sapi</h1>
      <div className="tampilanhome mb-5">
        <DataTabel />
      </div>
    </Container>
  );
}

export default TampilanSekitar;

export function DataTabel() {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://grafikserver.vercel.app/ambilDataSekitarKandangSapi"
        );
        setSensorData(response.data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Row className="justify-content-md-center">
      <div class="product-catagories-wrapper pt-3">
        <Container>
          <div class="product-catagory-wrap">
            <Container>
              <Card className="mb-3 catagory-card">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">NH3</th>
                      <th scope="col">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensorData.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                    
                        <td>
                          {data.NH3 !== null ? data.NH3.toFixed(1) : "NaN"}
                        </td>
                        <td>
                          {data.createdAt !== null
                            ? new Date(data.createdAt).toLocaleString()
                            : "NaN"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </Container>
          </div>
        </Container>
      </div>
    </Row>
  );
}