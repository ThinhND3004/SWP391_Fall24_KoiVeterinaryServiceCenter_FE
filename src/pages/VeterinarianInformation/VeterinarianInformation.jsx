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
import { BLUE_COLOR, ORANGE_COLOR } from "~/theme";

const VeterinarianInformation = () => {
  const location = useLocation();
  const { veterinarian } = location.state || {}; // Nhận toàn bộ data từ state

  // Kiểm tra xem data có tồn tại không
  if (!veterinarian) {
    return (
      <Typography sx={{ fontWeight: 600, fontSize: 20, color: ORANGE_COLOR, textAlign: 'center' }}>Không tìm thấy thông tin bác sĩ.</Typography>
    );
  }

  return (
    <Box padding={2}>
      {/* <Grid container spacing={2}> */}
      {/* <Grid item xs={12} md={6} display="flex" alignItems="center">
        {" "} */}
      {/* Thông tin bác sĩ */}
      <Typography sx={{ fontFamily: 'SVN-Konga Pro', fontSize: 45, color: BLUE_COLOR, mb: 5 }}>
        Veterinarian's Information
      </Typography>
      <Box sx={{ display: 'flex', gap: 10, alignItems: 'center', mb: 10 }}>
        <Avatar
          src={veterinarian.avatarUrl}
          alt={veterinarian.fullName}
          sx={{ marginRight: 2, width: 200, height: 200 }}
        />
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 25, mb: 2 }}>
            {veterinarian.fullName}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexDirection: 'column' }}>
            <Typography> Email: {veterinarian.email}</Typography>
            <Typography> Phone: {veterinarian.phone}</Typography>
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
        </Box>
      </Box >
      {/* </Grid > */}
    </Box >
  );
};

export default VeterinarianInformation;
