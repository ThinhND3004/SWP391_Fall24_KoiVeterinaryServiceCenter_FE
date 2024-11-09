import React, { useEffect, useState, useRef } from "react";
import { Button, Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import api from "~/config/axios";

const PaymentResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
  const orderId = queryParams.get("vnp_TxnRef");
  const amount = queryParams.get("vnp_Amount");
  // const createAt = queryParams.get("vnp_CreateDate");

  const successMessage =
    vnp_ResponseCode === "00" ? "Payment Successful!" : "Payment Unsuccessful!";

  // const [createBookingDTO, setCreateBookingDTO] = useState(null);
  const [bookingDTO, setBookingDTO] = useState(null);
  const [isBookingCreated, setIsBookingCreated] = useState(false);

  // useRef to track if booking creation is attempted already
  const bookingAttempted = useRef(false);

  useEffect(() => {
    const savedBooking = localStorage.getItem("createBookingDTO");
    
    // Lấy thông tin booking từ localStorage
    if (savedBooking && vnp_ResponseCode === "00" && !isBookingCreated && !bookingAttempted.current) {
      const bookingData = JSON.parse(savedBooking);
      // setCreateBookingDTO(bookingData);
      createBooking(bookingData);
      bookingAttempted.current = true; // Đánh dấu là đã thử tạo booking
    }

    console.log("Response Code:", vnp_ResponseCode);
    console.log("Order ID:", orderId);
    console.log("Amount:", amount);
    // console.log("Created At:", createAt);

    // Xóa createBookingDTO khỏi localStorage
    localStorage.removeItem("createBookingDTO");

  }, [vnp_ResponseCode, isBookingCreated]);

  const createBooking = async (bookingData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post("/bookings", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to create booking");
      }

      const bookingResult = await response.json();

      console.log("Booking Data from localStorage:", bookingData);
      console.log("VET ID:", bookingData.veterinarianId);

      console.log(bookingResult);

      setBookingDTO(bookingResult.data);
      setIsBookingCreated(true); // Đánh dấu booking đã được tạo
    } catch (error) {
      console.error("Error creating booking: ", error);
      alert(`Error creating booking: ${error.message}`);
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "45vh",
      }}
    >
      <Typography
        variant="h6"
        color={vnp_ResponseCode === "00" ? "green" : "red"}
      >
        {successMessage}
      </Typography>
      <Typography variant="body1">Order Code: {orderId}</Typography>
      <Typography variant="body1">Total Price: {amount / 100} VND</Typography>
      {/* <Typography variant="body1">Created At: {createAt}</Typography> */}
      
      

      {vnp_ResponseCode === "00" && bookingDTO && (
        <Box mt={2}>
          <Typography variant="h5">Booking Details:</Typography>
          <Typography variant="body1">
            Customer Name: {bookingDTO.customerFullName}
          </Typography>
          <Typography variant="body1">
            Service: {bookingDTO.serviceName}
          </Typography>
          <Typography variant="body1">
            Meeting Method: {bookingDTO.meetingMethod}
          </Typography>
          <Typography variant="body1">
            Veterinarian: {bookingDTO.veterinarianFullName}
          </Typography>

          {bookingDTO.meetingMethod !== "ONLINE" &&
            bookingDTO.meetingMethod !== "OFFLINE_CENTER" && (
              <Typography variant="body1">
                Address: {bookingDTO.userAddress}
              </Typography>
            )}

          <Typography variant="body1">
            Start At: {bookingDTO.startedAt}
          </Typography>
          <Typography variant="body1">
            Status: {bookingDTO.statusEnum}
          </Typography>

          <Typography variant="body1">
            Created At: {bookingDTO.createdAt}
          </Typography>
        </Box>
      )}

      {vnp_ResponseCode !== "00" && (
        <Box mt={2}>
          <Typography variant="body1">
            Your payment could not be processed. Please try again.
          </Typography>
        </Box>
      )}

      <Button
        variant="contained"
        color="secondary"
        onClick={() => (window.location.href = "/home")}
        sx={{ marginTop: 2 }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default PaymentResult;
