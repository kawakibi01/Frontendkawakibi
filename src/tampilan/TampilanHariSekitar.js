import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function TampilanHari() {
  return (
    <Container>
      <h1 className="judul text-center">Filter Hari Sekitar Kandang Sapi</h1>

      <div className="tampilanhome mb-5">
        <DataTabelbyDate />
      </div>
    </Container>
  );
}

export default TampilanHari;

export function DataTabelbyDate() {
  const [sensorData, setSensorData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async (selectedDate) => {
      try {
        const response = await axios.get(
          `https://grafikserver.vercel.app/ambilDataDenganTanggalSekitarKandangSapi?date=${formatDate(
            selectedDate
          )}`
        );
        const filteredData = response.data
          .filter(
            (data) =>
              new Date(data.createdAt).toLocaleDateString() ===
              selectedDate.toLocaleDateString()
          )
          .map((data) => ({
            ...data,
            createdAt: formatDate(data.createdAt),
          }));
        setSensorData(filteredData);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData(selectedDate);
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
          <tr key={`date-${index}`} className="date-indicator">
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
            {data.createdAt !== null ? formatDate(data.createdAt) : "N/A"}
          </td>
        </tr>
      );
    });

    return rows;
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
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
    const year = isoDate.slice(0, 4);
    return `${day} ${month} ${year} ${isoDate.slice(11, 19)}`;
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
                <Container>
                 
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
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return `${date.getHours()}:${date.getMinutes()}`;
                        }}
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
                  </div>
                </Container>
              </Card>
            </Container>
          </div>
        </Container>
      </div>
    </Row>
  );
}
