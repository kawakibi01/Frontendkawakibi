import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";

function TampilanHome() {
  return (
    <Container>
      <h1 className="judul text-center">Kandang Sapi</h1>
      <div className="tampilanhome mb-5">
        <DataTabel />
      </div>
    </Container>
  );
}

export default TampilanHome;

export function DataTabel() {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://grafikserver.vercel.app/ambilDataKandangSapi"
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
                      <th scope="col">Temperature</th>
                      <th scope="col">Humidity</th>
                      <th scope="col">NH3</th>
                      <th scope="col">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensorData.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {data.suhu !== null
                            ? data.suhu.toFixed(0) + " C"
                            : "NaN"}
                        </td>
                        <td>
                          {data.kelembaban !== null
                            ? data.kelembaban.toFixed(0) + " %"
                            : "NaN"}
                        </td>
                        <td>
                          {data.NH3 !== null ? data.NH3.toFixed(0) : "NaN"}
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