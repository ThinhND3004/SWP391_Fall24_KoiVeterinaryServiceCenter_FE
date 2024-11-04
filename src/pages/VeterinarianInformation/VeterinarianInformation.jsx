import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Avatar,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const VeterinarianInformation = () => {
  const location = useLocation();
  const { veterinarian } = location.state || {}; // Nhận toàn bộ data từ state

  // Kiểm tra xem data có tồn tại không
  if (!veterinarian) {
    return (
      <Typography color="error">Không tìm thấy thông tin bác sĩ.</Typography>
    );
  }

  return (
    <Box padding={2}>
      {/* <Grid container spacing={2}> */}
      <Grid item xs={12} md={6} display="flex" alignItems="center">
        {" "}
        {/* Thông tin bác sĩ */}
        <Avatar
          src={veterinarian.avatarUrl}
          alt={veterinarian.fullName}
          sx={{ marginRight: 2 }}
        />
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {veterinarian.fullName}
          </Typography>
          <Typography>Email: {veterinarian.email}</Typography>
          <Typography>Phone: {veterinarian.phone}</Typography>
          {/* <Typography>Address: {veterinarian.address}</Typography> */}
          <Typography>
            Certification: {veterinarian.profileDto.certification}
          </Typography>
          <Typography>
            Years of Experience: {veterinarian.profileDto.yearOfExperience}
          </Typography>
          <Typography>
            Education: {veterinarian.profileDto.education}
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
};

export default VeterinarianInformation;
