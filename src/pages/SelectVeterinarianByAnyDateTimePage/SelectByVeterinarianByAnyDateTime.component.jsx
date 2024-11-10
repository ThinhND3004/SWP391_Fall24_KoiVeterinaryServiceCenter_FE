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
import { BLUE_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from "~/theme";
import { toast } from "react-toastify"; // Thêm thư viện react-toastify nếu dùng
import 'dayjs/locale/en-gb'; // Đảm bảo import locale "vi"

// dayjs.locale('de');

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
    dayjs().add(1, "day").set("hour", 9).set("minute", 0)
  );

  const [noVeterinarianMessage, setNoVeterinarianMessage] = useState("");

  // Function to fetch data from API
  const fetchVeterinarianWithStartDateTime = async (startDateTime) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8089/accounts/idle-veterian-by-time/${service.id}/${startDateTime}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong in finding veterinarian");
      }

      const data = await response.json();
      setVeterinarians(data.data || []); // Set veterinarians if data exists
      if (data.data.length === 0) {
        setNoVeterinarianMessage(
          "We are unable to assign veterinarians during the hours when veterinarians are not available."
        );
      } else {
        setNoVeterinarianMessage(""); // Clear message if veterinarians are found
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when selectedDateTime changes
  useEffect(() => {
    if (selectedDateTime) {
      const formattedDateTime = selectedDateTime.format("YYYY-MM-DDTHH:mm");
      fetchVeterinarianWithStartDateTime(formattedDateTime);
    }
  }, [selectedDateTime]);

  // Handle date/time change
  const handleDateTimeChange = (newDateTime) => {
    if (newDateTime) {
      const updatedDateTime = newDateTime
        .set("second", 0)      // Set seconds to 0
        .set("millisecond", 0); // Set milliseconds to 0
      setSelectedDateTime(updatedDateTime);
    }
  };
  
  return (
    <Box>
      <Box p={2}>
        <Box sx={{ width: 1100 }}>
          <Typography
            sx={{
              fontFamily: "SVN-Konga Pro",
              fontSize: "45px",
              color: BLUE_COLOR,
              mb: 1,
            }}
          >
            Request Appointment
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Please fill out this form. We partner with the Aquatic Pet Vet to
            see clients in that service area.
          </Typography>
        </Box>
        {/* <Grid container alignItems="center" spacing={2}> */}
        {/* <Grid item xs={8}> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontWeight: 600, fontSize: 16, mb: 2 }}>
              Select start time
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
              <DateTimePicker
                sx={{
                  overflow: "hidden",
                  width: "500px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "15px",
                    borderColor: BLUE_COLOR,
                    height: "60px",
                    "&.Mui-focused fieldset": {
                      borderColor: BLUE_COLOR,
                    },
                  },
                  "& input": {
                    backgroundColor: INPUT_FIELD_COLOR,
                    padding: "20px 15px",
                    fontSize: "16px",
                    borderRadius: "15px",
                  },
                }}
                placeholder="Select the start time."
                value={selectedDateTime}
                onChange={handleDateTimeChange} // Update selected date and time
                // inputFormat="DD/MM/YYYY HH:mm"
                renderInput={(params) => (
                  <TextField {...params} fullWidth error={false} />
                )}
                minDate={dayjs().add(1, "day")} // Chặn chọn ngày hôm nay
                maxDate={dayjs().endOf("week").add(1, "day")} // Giới hạn ngày kết thúc vào Chủ Nhật
                minTime={dayjs().set("hour", 9).set("minute", 0)} // Giới hạn bắt đầu từ 7:00
                maxTime={dayjs().set("hour", 15).set("minute", 0)} // Giới hạn kết thúc vào 15:00
                format=""
                ampm={false} // Đặt để sử dụng định dạng 24 giờ
              />
            </LocalizationProvider>
          </Box>
          {/* </Grid> */}
          {/* <Grid item xs={4}> */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* <Typography sx={{ fontWeight: 600, fontSize: 16, mb: 2 }}>Status</Typography> */}
            <Button
              sx={{
                color: ORANGE_COLOR,
                borderRadius: "15px",
                width: "500px",
                height: "60px",
              }}
              variant="outlined"
              color="inherit"
              fullWidth
              onClick={() => {
                if (veterinarians.length === 0) {
                  toast.error(noVeterinarianMessage);
                } else {
                  navigate("/additional-info-booking", {
                    state: {
                      service,
                      serviceAddress,
                      veterinarian: null,
                      selectedDateTime: selectedDateTime.format(
                        "YYYY-MM-DDTHH:mm"
                      ),
                    },
                  });
                }
              }}
            >
              Not Specified
            </Button>
          </Box>
          {/* </Grid> */}
          {/* </Grid > */}
        </Box>
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
                        
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          sx={{ marginRight: 2 }}
                        >
                          <Avatar
                            src={vet.avatarUrl}
                            alt={vet.fullName}
                            sx={{ width: 80, height: 80, marginBottom: 1 }}
                          />
                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{ marginTop: "10px" }}
                            onClick={() => {
                              navigate(`/veterinarian-information`, {
                                state: { veterinarian: vet },
                              });
                            }}
                          >
                            View More
                          </Button>
                        </Box>

                        <Box>
                          <Typography variant="h6">{vet.fullName}</Typography>
                          <Typography variant="body1">{vet.email}</Typography>
                          <Typography variant="body1">
                            Phone: {vet.phone}
                          </Typography>
                          {/* <Typography variant="body1">
                            Address: {vet.address}
                          </Typography> */}
                          {/* <Typography variant="body1">
                            DOB: {vet.dob}
                          </Typography> */}
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
                        color="secondary"
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
                        Select Now
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: ORANGE_COLOR,
                    textAlign: "center",
                  }}
                >
                  No veterinarians available
                </Typography>
              </Box>
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default SelectVeterinarianByAnyDateTimeComponent;
