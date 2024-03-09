import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
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
        const modifiedData = response.data.map((data) => ({
          ...data,
          createdAt: formatDate(data.createdAt), // Mengubah format tanggal di sini
        }));
        setSensorData(modifiedData);
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
   const months = [
     "Jan",
     "Feb",
     "Mar",
     "Apr",
     "May",
     "Jun",
     "Jul",
     "Aug",
     "Sep",
     "Oct",
     "Nov",
     "Dec",
   ];
   const isoDate = new Date(
     date.getTime() - date.getTimezoneOffset() * 60000
   ).toISOString();
   const day = isoDate.slice(8, 10);
   const month = months[parseInt(isoDate.slice(5, 7), 10) - 1];
  //  const year = isoDate.slice(0, 4);
   return `${day} ${month} ${isoDate.slice(11, 19)}`;
 };

  return (
    <Row className="justify-content-md-center">
      <div className="product-catagories-wrapper pt-3">
        <Container>
          {/* <div className="section-heading">
            <h6 className="ml-3">Grafik Sensor</h6>
          </div> */}
          <div className="product-catagory-wrap">
            <Container>
              <Card className="mb-3 catagory-card" style={{ borderWidth: "2px" }}>

                <h3 className="text-center" style={{ marginTop: "10px" }}>
                  Grafik NH3
                </h3>

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
                    yAxisId="left"
                  />
                </LineChart>
              </Card>
            </Container>
          </div>
          <div className="product-catagory-wrap">
            <Container>
              <Card className="mb-3 catagory-card" style={{ borderWidth: "2px" }}>

                <h3 className="text-center" style={{ marginTop: "10px" }}>
                  Grafik Suhu
                </h3>
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
              <Card className="mb-3 catagory-card" style={{ borderWidth: "2px" }}>

                <h3 className="text-center" style={{ marginTop: "10px" }}>
                  Grafik Kelembaban
                </h3>
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