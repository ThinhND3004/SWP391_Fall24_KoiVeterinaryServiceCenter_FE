import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';

const VeterinarianInformation = () => {
  const location = useLocation();
  const { data } = location.state || {}; // Nhận toàn bộ data từ state

  // Kiểm tra xem data có tồn tại không
  if (!data || !data.veterinarian) {
    return <Typography color="error">Không tìm thấy thông tin bác sĩ.</Typography>;
  }

  const { veterinarian, slots } = data; // Truy cập thông tin bác sĩ và các slot từ data
  const [date, setDate] = useState(dayjs()); // Sử dụng dayjs để khởi tạo giá trị mặc định

  // Lọc các slot theo ngày đã chọn
  const filteredSlots = slots.find(slot => 
    dayjs(slot.date).isSame(date, 'day')
  );

  console.log("SLOTS: ", JSON.stringify(slots, null, 2));

  return (
    <Box padding={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}> {/* Thông tin bác sĩ */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {veterinarian.fullName}
          </Typography>
          <Typography>Email: {veterinarian.email}</Typography>
          <Typography>Phone: {veterinarian.phone}</Typography>
          <Typography>Address: {veterinarian.address}</Typography>
          <Typography>Certification: {veterinarian.profileDto.certification}</Typography>
          <Typography>Years of Experience: {veterinarian.profileDto.yearOfExperience}</Typography>
          <Typography>Education: {veterinarian.profileDto.education}</Typography>
        </Grid>
        
        <Grid item xs={12} md={6}> {/* Time slots */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={date}
              onChange={(newValue) => {
                if (newValue) {
                  setDate(newValue);
                }
              }}
              renderInput={(params) => <TextField {...params} />}
              shouldDisableDate={(date) => {
                const today = dayjs();
                const endOfWeek = today.add(7, 'day'); // Ngày cuối của tuần
                return date.isBefore(today, 'day') || date.isAfter(endOfWeek, 'day'); // Không cho phép chọn ngày trước hôm nay và sau 7 ngày
              }}
            />
          </LocalizationProvider>

          {/* Hiển thị các slot có sẵn */}
          {filteredSlots && filteredSlots.slots.length > 0 ? (
            <Box marginTop={2}>
              <Typography fontWeight="bold">Available Time Slots</Typography>
              {filteredSlots.slots.map((slot, index) => (
                <Button 
                  key={index} // Sử dụng index nếu không có id duy nhất
                  variant="outlined"
                  sx={{
                    margin: "5px",
                    borderColor: "black", // Khung viền màu đen
                    color: "inherit", // Màu chữ giữ nguyên
                  }}
                  onClick={() => {
                    console.log(`Đã chọn slot: ${slot.startTime} - ${slot.endTime}`);
                  }}
                >
                  {slot.startTime} - {slot.endTime} {/* Hiển thị thời gian slot */}
                </Button>
              ))}
            </Box>
          ) : (
            <Typography color="error" marginTop={1}>
              Bác sĩ hiện không có slot nào cho ngày này.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default VeterinarianInformation;
