import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaRedo,
  FaTimes,
  FaInfoCircle,
} from "react-icons/fa";
import { format } from "date-fns";

const AppointmentComponent = () => {
  const [appointments, setAppointments] = useState([]);
  const [sortBy, setSortBy] = useState("all"); // "all" để hiển thị tất cả các dịch vụ
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const page = 1;
          const unitPerPage = 10;
          const status = "PENDING";

          const response = await fetch(
            `http://localhost:8080/bookings?page=${page}&unitPerPage=${unitPerPage}&status=${status}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch appointments");
          }

          const data = await response.json();
          setAppointments(data.data);
        } catch (error) {
          console.error("Failed to fetch appointments:", error);
        }
      } else {
        navigate("/login");
      }
    };

    fetchAppointments();
  }, [navigate]);

  // Hàm sắp xếp dựa trên lựa chọn sortBy
  const sortedAppointments = [...appointments]
    .filter(
      (appointment) => sortBy === "all" || appointment.serviceName === sortBy
    )
    .sort((a, b) => {
      if (sortBy === "startedAt") {
        return new Date(a.startedAt) - new Date(b.startedAt);
      }
      return a.serviceName.localeCompare(b.serviceName);
    });

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", color: "#4A4A4A", fontSize: "24px" }}>
        Appointments
      </h2>

      {/* Dropdown chọn tiêu chí sắp xếp */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <label style={{ marginRight: "10px" }}>Sort by: </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="all">All Services</option>
          <option value="Online Consultant">Online Consultant</option>
          <option value="Koi Treatment at home">Koi Treatment At Home</option>
          <option value="Koi Treatment at center">
            Koi Treatment At Center
          </option>
          {/* Add more services as needed */}
        </select>
      </div>

      {sortedAppointments && sortedAppointments.length > 0 ? (
        sortedAppointments.map((appointment) => (
          <div
            key={appointment.id}
            style={{
              border: "1px solid #E0E0E0",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "15px",
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <FaCalendarAlt color="#4A90E2" size={20} />
              <h3 style={{ margin: 0, color: "#333", fontSize: "18px" }}>
                {appointment.serviceName}
              </h3>
            </div>

            <div style={{ fontSize: "14px", color: "#555" }}>
              <p>
                <strong>Veterinarian:</strong>{" "}
                {appointment.veterinarianFullName}
              </p>
              <p>
                <strong>Meeting Method:</strong> {appointment.meetingMethod}
              </p>
              <p>
                <strong>Start Time:</strong>{" "}
                {format(new Date(appointment.startedAt), "dd/MM/yyyy HH:mm")}
              </p>
              <p>
                <strong>Status:</strong> {appointment.statusEnum}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {format(new Date(appointment.createdAt), "dd/MM/yyyy HH:mm")}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "15px",
                borderTop: "1px solid #E0E0E0",
                paddingTop: "15px",
              }}
            >
              {/* <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007BFF", // Màu xanh dương cho nút
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
                onClick={() =>
                  alert("Hiển thị quy định và trách nhiệm của khách hàng")
                }
              >
                <FaInfoCircle /> Regulations & Responsibilities
              </button> */}

              {/* <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#F5A623",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
                onClick={() => navigate("/reschedule-any-time")} // Điều hướng tới confirm-booking
              >
                <FaRedo /> Reschedule
              </button> */}

              {/* <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
                onClick={() =>
                  alert("View payment info feature is under development")
                }
              >
                <FaTimes /> Cancel
              </button> */}

              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#7ED321",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
                onClick={() =>
                  alert("View payment info feature is under development")
                }
              >
                <FaDollarSign /> Payment Info
              </button>
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#888", fontSize: "16px" }}>
          No appointments available
        </p>
      )}
    </div>
  );
};

export default AppointmentComponent;
