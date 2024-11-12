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

  return (
    <div>
      <Box
        sx={{
          mt: 5,
          mb: 10,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 10

        }}
      >
        {/* avt-btn */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <img
            style={{
              width: "500px",
              borderRadius: "30px",
              marginBottom: "20px",
            }}
            src="https://img.freepik.com/premium-photo/beautiful-painting-three-colorful-koi-fish
                                                -are-swimming-pet-generative-ai-illustration_132416-8965.jpg"
            alt="Account image"
          />

          <Button
            style={{
              height: "50px",
              width: "150px",
              borderRadius: "30px",
              backgroundColor: BLUE_COLOR,
              color: "white",
              textAlign: "center",
              display: "flex",
              justifyContent: "center", // Centers content horizontally
              alignItems: "center",
              padding: "0px 9px", // Smooth background color transition
            }}
            onClick={() => {
              navigate(`/veterinarian-information`, {
                state: { veterinarian: veterian },
              });
            }}
          >
            Detail
          </Button>
        </Box>

        {/* schedule */}

        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontWeight: 700, fontSize: 25 }}>{veterian.fullName}</Typography>
            <Typography sx={{ fontWeight: 400, fontSize: 20, mt: 1 }}>{veterian.email}</Typography>
          </Box>
          <FormControl sx={{
            marginTop: '15px',
            width: '100%',
            borderRadius: '15px'
          }}>
            <InputLabel id="demo-simple-select-label">
              Date
            </InputLabel>
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
                  value={dayjs(timeSlot.date).add(1, "day").format("YYYY-MM-DD")}
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
                          {slotEntity.startTime} - {slotEntity.endTime}
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
