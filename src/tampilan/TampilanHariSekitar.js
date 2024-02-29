import { Card, Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function TampilanHariSekitar() {
  return (
    <Container>
      <h1 className="judul text-center">Filter Hari Sekitar Kandang Sapi</h1>

      <div className="tampilanhome mb-5">
        <DataTabelbyDate />
      </div> 
    </Container>
  );
}

export default TampilanHariSekitar;

export function DataTabelbyDate() {
  const [sensorData, setSensorData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://grafikserver.vercel.app/ambilDataDenganTanggal?date=${selectedDate.toISOString()}`
        );
        // Filter data berdasarkan tanggal yang dipilih
        const filteredData = response.data.filter(
          (data) =>
            new Date(data.createdAt).toLocaleDateString() ===
            selectedDate.toLocaleDateString()
        );
        setSensorData(filteredData);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDayName = (date) => {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const dayIndex = new Date(date).getDay();
    return days[dayIndex];
  };

  const renderDataRows = () => {
    if (sensorData.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="text-center">
            Tidak ada data untuk hari ini.
          </td>
        </tr>
      );
    }

    let rows = [];
    let currentDate = null;

    sensorData.forEach((data, index) => {
      const currentDataDate = new Date(data.createdAt).toLocaleDateString();
      const dayName = formatDayName(data.createdAt);

      if (currentDataDate !== currentDate) {
        rows.push(
          <tr key= {`date-${index}`} className="date-indicator">
            <td colSpan="5">
              <strong>{dayName}</strong> - {currentDataDate}
            </td>
          </tr>
        );
        currentDate = currentDataDate;
      }

      rows.push(
        <tr key={`data-${index}`}>
          <td>{index + 1}</td>
        
          <td>{data.NH3 !== null ? data.NH3 : "N/A"}</td>
          <td>
            {data.createdAt !== null
              ? new Date(data.createdAt).toLocaleString()
              : "N/A"}
          </td>
        </tr>
      );
    });

    return rows;
  };

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
      <div class="product-catagories-wrapper pt-3">
        <Container>
          <div class="section-heading">
            <h6 class="ml-3">Grafik Sensor</h6>
          </div>
          <div class="product-catagory-wrap">
            <Container>
              <Card className="mb-3 catagory-card">
                <div className="datepicker-wrapper">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                    
                      <th scope="col">NH3</th>
                      <th scope="col">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>{renderDataRows()}</tbody>
                </table>
                <div className="d-flex justify-content-center">
                  <LineChart
                    width={500}
                    height={300}
                    data={sensorData}
                    margin={{ top: 5, right: 50, left: 50, bottom: 5 }}
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
                </div>
              </Card>
            </Container>
          </div>
        </Container>
      </div>
    </Row>
  );
}