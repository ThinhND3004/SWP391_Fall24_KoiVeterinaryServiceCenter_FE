import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Button,
  Typography,
  Grid,
  TextField,
  Avatar,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const SelectVeterinarianByAvailableSlotTimeComponent = () => {
  const [veterinarians, setVeterinarians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDates, setSelectedDates] = useState({});
  const navigate = useNavigate();
  const serviceId = "753b5784-e041-4fc1-8018-0a001e8d558e";

  const getStartAndEndOfWeek = () => {
    const startOfWeek = dayjs().startOf("week");
    const endOfWeek = dayjs().endOf("week");
    return { startOfWeek, endOfWeek };
  };

  const { startOfWeek, endOfWeek } = getStartAndEndOfWeek();

  const fetchVeterinarianWithTimeSlot = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/accounts/veterian-with-time-slot/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setVeterinarians(data.data || []);

      const today = dayjs();
      const defaultDates = {};
      data.data.forEach((veterinarian) => {
        defaultDates[veterinarian.email] = today;
      });
      setSelectedDates(defaultDates);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVeterinarianWithTimeSlot();
  }, [serviceId]);

  const isSameDay = (date1, date2) => {
    return dayjs(date1).isSame(dayjs(date2), "day");
  };

  const handleDateChange = (veterinarianEmail, newValue) => {
    setSelectedDates((prevDates) => ({
      ...prevDates,
      [veterinarianEmail]: newValue,
    }));
  };

  return (
    <Box padding={2}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Select Veterinarian
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
        <Box>
          {veterinarians.map((veterinarian) => (
            <Box
              key={veterinarian.email}
              padding={1}
              border={1}
              borderColor="grey.300"
              borderRadius={2}
              marginBottom={2}
              marginTop={2}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center" marginBottom={2}>
                    <Avatar
                      alt={veterinarian.fullName}
                      src={veterinarian.profileDto.imageUrl} // Đường dẫn tới hình ảnh
                      sx={{ width: 100, height: 100, marginRight: 2 }} // Kích thước của avatar và khoảng cách bên phải
                    />
                    <Box>
                      <Typography fontWeight="bold">
                        {veterinarian.fullName}
                      </Typography>
                      <Typography>Email: {veterinarian.email}</Typography>
                      <Typography>Phone: {veterinarian.phone}</Typography>
                      <Typography>Address: {veterinarian.address}</Typography>
                      <Typography>
                        Certification: {veterinarian.profileDto.certification}
                      </Typography>
                      <Typography>
                        Years of Experience:{" "}
                        {veterinarian.profileDto.yearOfExperience}
                      </Typography>
                      <Typography>
                        Education: {veterinarian.profileDto.education}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select Date"
                      value={selectedDates[veterinarian.email] || dayjs()}
                      onChange={(newValue) =>
                        handleDateChange(veterinarian.email, newValue)
                      }
                      renderInput={(params) => <TextField {...params} />}
                      minDate={startOfWeek}
                      maxDate={endOfWeek}
                    />
                  </LocalizationProvider>

                  {selectedDates[veterinarian.email] &&
                    veterinarian.timeSlot
                      .filter((timeSlot) =>
                        isSameDay(
                          timeSlot.date,
                          selectedDates[veterinarian.email]
                        )
                      )
                      .map((timeSlot) => (
                        <Box key={timeSlot.date} marginTop={1}>
                          <Typography fontWeight="bold">
                            Available Time Slots
                          </Typography>
                          {timeSlot.slots.map((slot, index) => (
                            <Button
                              key={index}
                              variant="outlined"
                              sx={{
                                margin: "5px",
                                borderColor: "black", // Khung viền màu đen
                                color: "inherit", // Màu chữ giữ nguyên
                              }}
                            >
                              {slot.startTime} - {slot.endTime}
                            </Button>
                          ))}
                        </Box>
                      ))}

                  {selectedDates[veterinarian.email] &&
                    !veterinarian.timeSlot.some((timeSlot) =>
                      isSameDay(
                        timeSlot.date,
                        selectedDates[veterinarian.email]
                      )
                    ) && (
                      <Typography color="error" marginTop={1}>
                        Bác sĩ hiện không hoạt động vào ngày này.
                      </Typography>
                    )}
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
                onClick={() => {
                  navigate(`/veterinarian-information`, {
                    state: {
                      data: { veterinarian, slots: veterinarian.timeSlot }, // Truyền veterinarian và time slots
                    },
                  });
                }}
              >
                View More
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SelectVeterinarianByAvailableSlotTimeComponent;
