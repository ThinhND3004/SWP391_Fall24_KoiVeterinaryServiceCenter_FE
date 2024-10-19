import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
// import { cwd } from "process";

const ConfirmBookingComponent = () => {
  const location = useLocation(); // Nhận dữ liệu từ state
  const { createBookingDTO, serviceEntity } = location.state;
  console.log(createBookingDTO);

  const totalPrice =
    createBookingDTO.servicePrice +
    createBookingDTO.travelPrice * createBookingDTO.distanceMeters;

  //sẽ sửa chức năng này sau

  const handleBooking = async (createBookingDTO) => {
    console.log(createBookingDTO);

    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      console.log(token);

      const response = await fetch("http://localhost:8080/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Thêm Authorization header
        },
        body: JSON.stringify(createBookingDTO), // gửi bookingData lên API
      });

      const result = await response.json(); // Lấy dữ liệu phản hồi từ server
      if (!response.ok) {
        throw new Error(result.message || "Failed to create booking");
      }
      console.log(result);

      alert("Booking confirmed!");
      // Bạn có thể thêm logic chuyển hướng hoặc cập nhật trạng thái khác tại đây
    } catch (error) {
      console.error("Error creating booking: ", error);
      alert(`Error creating booking: ${error.message}`);
    }
  };

  return (
    <div>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"100px"}
        px={"30px"}
      ></Box>

      <div>
        <Typography variant="h4" fontWeight="bold">
          Confirm Your Booking{" "}
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
            Service:
          </Typography>
          <Typography>{serviceEntity.name}</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
            Veterinarian:
          </Typography>
          <Typography>
            {createBookingDTO.veterinarianId
              ? createBookingDTO.veterinarianId
              : "is not assigned"}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
            Type:
          </Typography>
          <Typography>{serviceEntity.type}</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
            Meeting method:
          </Typography>
          <Typography>{createBookingDTO.meetingMethod}</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
            Start At:
          </Typography>
          <Typography>{createBookingDTO.startAt}</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
            Additional Information:
          </Typography>
          <Typography>
            {createBookingDTO.additionalInformation
              ? createBookingDTO.additionalInformation
              : "nothing"}
          </Typography>
        </Box>

        {createBookingDTO.meetingMethod !== "OFFLINE_CENTER" &&
          createBookingDTO.meetingMethod !== "ONLINE" && (
            // <>
            <Box display="flex" alignItems="center">
              <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
                Address:
              </Typography>
              <Typography>{createBookingDTO.userAddress}</Typography>
            </Box>
          )}

        {createBookingDTO.meetingMethod !== "OFFLINE_CENTER" &&
          createBookingDTO.meetingMethod !== "ONLINE" && (
            <Box display="flex" alignItems="center">
              <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
                Distance:
              </Typography>
              <Typography>{createBookingDTO.distanceMeters} km </Typography>
            </Box>
          )}

        {createBookingDTO.meetingMethod !== "OFFLINE_CENTER" &&
          createBookingDTO.meetingMethod !== "ONLINE" && (
            <Box display="flex" alignItems="center">
              <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
                Travel Cost:
              </Typography>
              <Typography>
                ${createBookingDTO.travelPrice * createBookingDTO.distanceMeters}
              </Typography>
            </Box>
          )}

        <Box display="flex" alignItems="center">
          <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
            Service Price:
          </Typography>
          <Typography>${createBookingDTO.servicePrice}</Typography>
        </Box>

        <Typography
          fontWeight="bold"
          variant="h6"
          style={{ marginRight: "8px" }}
        >
          Total Price: ${totalPrice}
        </Typography>
      </div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleBooking(createBookingDTO)}
      >
        Confirm Booking
      </Button>
    </div>
  );
};

export default ConfirmBookingComponent;
