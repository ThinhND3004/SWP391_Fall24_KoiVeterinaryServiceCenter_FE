/* eslint-disable indent */
/* eslint-disable semi */
import {
  Box,
  FormControl,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "react-bootstrap";
import {
  BLACK_COLOR,
  BLUE_COLOR,
  GRAY_COLOR,
  INPUT_FIELD_COLOR,
} from "~/theme";
import { List } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { size } from "lodash";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";

const ServiceChooseCon = ({ veterian }) => {
  const location = useLocation(); // Nhận dữ liệu từ state
  const { service, serviceAddress } = location.state || {};
  const [date, setDate] = useState(
    dayjs(veterian.timeSlot[0].date).add(1, "day").format("YYYY-MM-DD")
  );
  const [dateAvai, setDateAvai] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (date) {
      console.log("DATE", date);
      setDateAvai(date);
    }
    console.log("SERVICEEEEE", service);
  }, [date]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
    setDateAvai(date);
  };

  const handleClickTimeSlot = (slotEntity) => {
    const date = new Date(`${dateAvai}T${slotEntity.startTime}Z`); // :00 for seconds
    console.log("DATE SUBMIT", date.toISOString());

    navigate("/additional-info-booking", {
      state: {
        service,
        serviceAddress,
        veterinarian: veterian,
        selectedDateTime: date.toISOString(),
      },
    });
  };

  const adjustEndTime = (endTime) => {
    // Chuyển đổi endTime thành đối tượng Date, giả sử format là HH:mm
    const timeParts = endTime.split(":");
    const adjustedTime = new Date();
    
    adjustedTime.setHours(timeParts[0], timeParts[1], 0);  // Set giờ và phút từ endTime
  
    // Trừ đi 1 giờ
    adjustedTime.setHours(adjustedTime.getHours() - 1);
  
    // Chuyển lại thành định dạng HH:mm
    return adjustedTime.toTimeString().slice(0, 5); // Chỉ lấy phần HH:mm
  };

  const adjustStartTime = (endTime) => {
    // Chuyển đổi endTime thành đối tượng Date, giả sử format là HH:mm
    const timeParts = endTime.split(":");
    const adjustedTime = new Date();
    
    adjustedTime.setHours(timeParts[0], timeParts[1], 0);  // Set giờ và phút từ endTime
  
    // Chuyển lại thành định dạng HH:mm
    return adjustedTime.toTimeString().slice(0, 5); // Chỉ lấy phần HH:mm
  };

  return (
    <div>
      <Box
        sx={{
          mt: 5,
          mb: 10,
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
          {/* Vet info column */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      flexGrow: 1, // Đảm bảo cột này chiếm không gian còn lại
      maxWidth: "45%", // Giới hạn độ rộng tối đa của cột thông tin Vet
    }}
  >
        {/* avt-btn */}
        <Box
          display={"flex"}
          flexDirection={"row"}
          // justifyContent={"center"}
          // alignItems={"center"}
        >
          {/* avatar img in the left */}
          <img
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "55%", 
              marginRight: "20px",
            }}
            src="https://img.freepik.com/premium-photo/beautiful-painting-three-colorful-koi-fish-are-swimming-pet-generative-ai-illustration_132416-8965.jpg"
            alt="Account image"
          />

          {/* Vet info in the right */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontWeight: 700, fontSize: 25 }}>
              {veterian.fullName}
            </Typography>
            <Typography>
              {veterian.email}
            </Typography>
            <Typography>
              Certification: {veterian.profileDto.certification}
            </Typography>
            <Typography>Education: {veterian.profileDto.education}</Typography>
            <Typography>
              Years of Experience: {veterian.profileDto.yearOfExperience}
            </Typography>
          </Box>

        </Box>
        </Box>

        {/* schedule */}

  {/* Schedule column */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      flexGrow: 1, // Đảm bảo cột này chiếm không gian còn lại
      maxWidth: "50%", // Giới hạn độ rộng tối đa của bảng thời gian
    }}
  >
          {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontWeight: 700, fontSize: 25 }}>{veterian.fullName}</Typography>
            <Typography sx={{ fontWeight: 400, fontSize: 20, mt: 1 }}>{veterian.email}</Typography>
          </Box> */}
          <FormControl
            sx={{
              marginTop: "15px",
              width: "100%",
              borderRadius: "15px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Date</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={date}
              onChange={handleDateChange}
              label="Date"
            >
              {veterian.timeSlot.map((timeSlot) => (
                <MenuItem
                  key={timeSlot.date}
                  value={dayjs(timeSlot.date)
                    .add(1, "day")
                    .format("YYYY-MM-DD")}
                >
                  {dayjs(timeSlot.date).add(1, "day").format("YYYY-MM-DD")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box
            sx={{
              marginTop: "10px",
              padding: "20px",
              overflowY: "auto", // Enable vertical scrollbar when content overflows
              border: `1px solid ${BLUE_COLOR}`, // Optional: Add a border to define the scrollable area
              borderRadius: "14px", // Optional: Round the corners of the container
            }}
          >
            <Grid container spacing={2}>
              {veterian.timeSlot.map(
                (slot, index) =>
                  slot.date === dateAvai && (
                    <Grid item xs={4} key={index}>
                      {slot.slots.map((slotEntity) => (
                        <Button
                          key={slotEntity.startTime}
                          style={{
                            height: 50,
                            width: 200,
                            backgroundColor: INPUT_FIELD_COLOR,
                            color: GRAY_COLOR,
                            borderRadius: 20,
                            border: "1px solid grey",
                            margin: 5,
                          }}
                          variant="contained"
                          fullWidth
                          onClick={() => handleClickTimeSlot(slotEntity)}
                        >
                          {adjustStartTime(slotEntity.startTime)} - {adjustEndTime(slotEntity.endTime)} 
                        </Button>
                      ))}
                    </Grid>
                  )
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ServiceChooseCon;
