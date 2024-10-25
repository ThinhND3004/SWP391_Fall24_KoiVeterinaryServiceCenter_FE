import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";

const SelectVeterinarianByAnyDateTimeComponent = () => {
  const location = useLocation(); // Nhận dữ liệu từ state
  const { service, serviceAddress } = location.state || {};

  const navigate = useNavigate();

  // console.log(service.id);
  // console.log(serviceAddress);

  // State management
  const [veterinarians, setVeterinarians] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(
    dayjs().add(1, "day").set("hour", 7).set("minute", 0)
  );

  // Function to fetch data from API
  const fetchVeterinarianWithStartDateTime = async (startDateTime) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/accounts/idle-veterian-by-time/${service.id}/${startDateTime}`,
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
      setVeterinarians(data.data || []); // Set veterinarians if data exists
    } catch (err) {
      setError(err.message); // Handle errors
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Fetch data when selectedDateTime changes
  useEffect(() => {
    if (selectedDateTime) {
      const formattedDateTime = selectedDateTime.format("YYYY-MM-DDTHH:mm:ss");
      fetchVeterinarianWithStartDateTime(formattedDateTime);
    }
  }, [selectedDateTime]);

  // Handle date/time change
  const handleDateTimeChange = (newDateTime) => {
    if (newDateTime) {
      setSelectedDateTime(newDateTime);
    }
  };

  return (
    <Box p={2}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={8}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Chọn thời gian bắt đầu"
              value={selectedDateTime}
              onChange={handleDateTimeChange} // Update selected date and time
              renderInput={(params) => (
                <TextField {...params} fullWidth error={false} />
              )}
              minDate={dayjs().add(1, "day")} // Chặn chọn ngày hôm nay
              maxDate={dayjs().endOf("week").add(1, "day")} // Giới hạn ngày kết thúc vào Chủ Nhật
              minTime={dayjs().set("hour", 7).set("minute", 0)} // Giới hạn bắt đầu từ 7:00
              maxTime={dayjs().set("hour", 15).set("minute", 0)} // Giới hạn kết thúc vào 15:00
              ampm={false} // Đặt để sử dụng định dạng 24 giờ
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => {
              navigate("/additional-info-booking", {
                state: {
                  service,
                  serviceAddress,
                  veterinarian: null, // Pass the selected veterinarian
                  selectedDateTime: selectedDateTime.format(
                    "YYYY-MM-DDTHH:mm:ss"
                  ),
                },
              });
            }}
          >
            Không chỉ định
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={2} mt={2}>
          {veterinarians.length > 0 ? (
            veterinarians.map((vet) => (
              <Grid item xs={12} key={vet.email}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{ borderBottom: "1px solid #ccc", padding: 2 }}
                >
                  <Grid item xs={8}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={vet.avatarUrl}
                        alt={vet.fullName}
                        sx={{ marginRight: 2 }}
                      />
                      <Box>
                        <Typography variant="h6">{vet.fullName}</Typography>
                        <Typography variant="body1">{vet.email}</Typography>
                        <Typography variant="body1">
                          Phone: {vet.phone}
                        </Typography>
                        <Typography variant="body1">
                          Address: {vet.address}
                        </Typography>
                        <Typography variant="body1">DOB: {vet.dob}</Typography>
                        {vet.profileDto && (
                          <>
                            <Typography variant="body2">
                              Certification: {vet.profileDto.certification}
                            </Typography>
                            <Typography variant="body2">
                              Education: {vet.profileDto.education}
                            </Typography>
                            <Typography variant="body2">
                              Years of Experience:{" "}
                              {vet.profileDto.yearOfExperience}
                            </Typography>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={4} display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        navigate("/additional-info-booking", {
                          state: {
                            service,
                            serviceAddress,
                            veterinarian: vet, // Pass the selected veterinarian
                            selectedDateTime: selectedDateTime.format(
                              "YYYY-MM-DDTHH:mm:ss"
                            ),
                          },
                        });
                      }}
                    >
                      Đặt ngay
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))
          ) : (
            <Typography>No veterinarians available</Typography>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default SelectVeterinarianByAnyDateTimeComponent;
