/* eslint-disable semi */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { format } from "date-fns";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Button
} from "@mui/material";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import {
  BLUE_COLOR,
  GRAY_COLOR,
  INPUT_FIELD_COLOR,
  ORANGE_COLOR
} from "~/theme";
import GradeIcon from '@mui/icons-material/Grade'



export default function BookingListDetails() {
  const [appointments, setAppointments] = useState([]);
  const [sortBy, setSortBy] = useState("all"); // Default to showing all services
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [RateValue, setRateValue] = React.useState(2);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            `http://localhost:8089/bookings?page=1&unitPerPage=10&status=CONFIRMED`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!response.ok) throw new Error("Failed to fetch appointments");

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

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <div>
      <Box>
        <Typography sx={{ fontFamily: 'SVN-Konga Pro', fontSize: 150, color: BLUE_COLOR, textAlign: 'center' }}>
          Bookings
        </Typography>
      </Box>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          alignItems: 'center',
          gap: 10
        }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Sort by:</Typography>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            width: '800px',
            height: '40px',
            borderRadius: '14px',
            padding: '5px',
            backgroundColor: INPUT_FIELD_COLOR,
            border: '1px solid #bdbdbd'
          }}
        >
          <option value="all">All Services</option>
          <option value="Online Consultant">Online Consultant</option>
          <option value="Koi Treatment at home">Koi Treatment At Home</option>
          <option value="Koi Treatment at center">Koi Treatment At Center</option>
        </select>
      </div>

      {sortedAppointments.length > 0 ? (
        sortedAppointments.map((appointment) => (
          <div
            key={appointment.id}
            style={{
              border: "1px solid #bdbdbd",
              borderRadius: "14px",
              padding: "20px",
              marginBottom: "15px",
              backgroundColor: INPUT_FIELD_COLOR,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <FaCalendarAlt />
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>
                {appointment.serviceName}
              </h3>
            </div>

            <div style={{ fontSize: "16px" }}>
              <p style={{ display: 'flex', gap: 3 }}>
                <Typography sx={{ fontWeight: 600, mt: 1 }}>Veterinarian:</Typography>
                <Typography sx={{ fontWeight: 500, mt: 1 }}>{appointment.veterinarianFullName}</Typography>
              </p>
              <p style={{ display: 'flex', gap: 3 }}>
                <Typography sx={{ fontWeight: 600, mt: 1 }}>Meeting method:</Typography>
                <Typography sx={{ fontWeight: 400, mt: 1 }}>{appointment.meetingMethod}</Typography>
              </p>
              <p style={{ display: 'flex', gap: 3 }}>
                <Typography sx={{ fontWeight: 600, mt: 1 }}>Start time:</Typography>
                <Typography sx={{ fontWeight: 400, mt: 1 }}>{format(new Date(appointment.startedAt), "dd/MM/yyyy HH:mm")}</Typography>
              </p>
              <p style={{ display: 'flex', gap: 3 }}>
                <Typography sx={{ fontWeight: 600, mt: 1 }}>Status:</Typography>
                <Typography sx={{ fontWeight: 400, mt: 1 }}>{appointment.statusEnum}</Typography>
              </p>
              <p style={{ display: 'flex', gap: 3 }}>
                <Typography sx={{ fontWeight: 600, mt: 1 }}>Created At:</Typography>
                <Typography sx={{ fontWeight: 400, mt: 1 }}>{format(new Date(appointment.createdAt), "dd/MM/yyyy HH:mm")}</Typography>
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
              <button
                style={{
                  width: '200px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontFamily: 'Poppins',
                  backgroundColor: BLUE_COLOR,
                  borderRadius: '30px'
                }}
                onClick={() => alert("View payment info feature is under development")}
              >
                Payment Info
              </button>

              <button
                style={{
                  width: '200px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontFamily: 'Poppins',
                  backgroundColor: BLUE_COLOR,
                  borderRadius: '30px'
                }}
                onClick={handleClickOpen}
              >
                View Feedbacks
              </button>

              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    width: '600px',
                    maxWidth: '90%',
                    bgcolor: INPUT_FIELD_COLOR,
                    borderRadius: '30px',
                  }
                }}
              >
                <DialogTitle sx={{ marginTop: 4 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 20, textAlign: 'center' }}>View Feedbacks</Typography>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText sx={{ fontWeight: 600, fontSize: 14, textAlign: 'center' }}>
                    Your feedback helps us improve—please take a moment to rate our service!
                  </DialogContentText>
                  {/* Additional Rating Component can be added here */}
                  {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
                    <Rating name="read-only" value={value} readOnly sx={{ fontSize: 40 }} />
                  </Box> */}

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    {/* <Box> */}
                    <Box sx={{ display: 'flex', gap: 5, mt: 2 }}>
                      <Typography sx={{ fontWeight: 500 }}>
                        Fullname
                      </Typography>
                      <Rating name="read-only" value={value} readOnly sx={{ fontSize: 20 }} />

                    </Box>
                    <Typography sx={{ fontSize: 14 }}>
                      I had a fantastic experience at Koi Care Clinic! The staff was friendly and knowledgeable, and they explained every step of my koi’s treatment clearly. The follow-up care really showed how much they care about their clients. My only suggestion would be to offer weekend appointments for added convenience. Highly recommend this clinic for any koi care!
                    </Typography>
                    {/* </Box> */}

                  </Box>

                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    sx={{
                      bgcolor: BLUE_COLOR,
                      borderRadius: '14px',
                      color: 'white',
                      width: '100px',
                      height: '40px',
                      mr: 6,
                      mb: 3
                    }}
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        ))
      ) : (
        <Box sx={{ mb: 5, mt: 5 }}>
          <p style={{ textAlign: "center", color: ORANGE_COLOR, fontSize: "16px", fontWeight: 600 }}>
            No appointments available
          </p>
        </Box>
      )}
    </div>
  );
}
