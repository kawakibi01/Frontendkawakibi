import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Card } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function TampilanGrafik() {
  return (
    <Container>
      <h1 className="judul text-center">Grafik Kandang Sapi</h1>

      <div className="tampilanhome mb-5">
        <GrafikSuhu />
      </div>
    </Container>
  );
}

export default TampilanGrafik;

export function GrafikSuhu() {
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

  const formatNumber = (number) => {
    return number.toFixed(0);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const isoDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
    return isoDate.slice(0, 19).replace("T", " ");
  };

  return (
    <Row className="justify-content-md-center">
      <div className="product-catagories-wrapper pt-3">
        <Container>
          <div className="section-heading">
            <h6 className="ml-3">Grafik Sensor</h6>
          </div>
          <div className="product-catagory-wrap">
            <Container>
              <Card className="mb-3 catagory-card">
                <LineChart
                  width={1000}
                  height={500}
                  data={sensorData.map((data) => ({
                    ...data,
                    NH3: data.NH3 !== null ? data.NH3 : 0,
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="createdAt"
                    type="category"
                    tickFormatter={formatDate}
                  />
                  <YAxis yAxisId="left" tickFormatter={formatNumber} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={formatNumber}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="NH3"
                    stroke="#ffc658"
                    name="NH3"
                    yAxisId="right"
                  />
                </LineChart>
              </Card>
            </Container>
          </div>
          <div className="product-catagory-wrap">
            <Container>
              <Card className="mb-3 catagory-card">
                <LineChart
                  width={1000}
                  height={500}
                  data={sensorData.map((data) => ({
                    ...data,
                    suhu: data.suhu !== null ? data.suhu : 0,
                  
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="createdAt"
                    type="category"
                    tickFormatter={formatDate}
                  />
                  <YAxis yAxisId="left" tickFormatter={formatNumber} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={formatNumber}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="suhu"
                    stroke="#8884d8"
                    name="Suhu (°C)"
                    yAxisId="left"
                  />
                
                </LineChart>
              </Card>
            </Container>
          </div>
          <div className="product-catagory-wrap">
            <Container>
              <Card className="mb-3 catagory-card">
                <LineChart
                  width={1000}
                  height={500}
                  data={sensorData.map((data) => ({
                    ...data,
                    kelembaban: data.kelembaban !== null ? data.kelembaban : 0,
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="createdAt"
                    type="category"
                    tickFormatter={formatDate}
                  />
                  <YAxis yAxisId="left" tickFormatter={formatNumber} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={formatNumber}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="kelembaban"
                    stroke="#82ca9d"
                    name="Kelembaban (%)"
                    yAxisId="left"
                  />
                </LineChart>
              </Card>
            </Container>
          </div>
        </Container>
      </div>

    </Row>
  );
}