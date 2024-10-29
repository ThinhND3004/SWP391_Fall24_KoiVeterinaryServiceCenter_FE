import React, { useEffect, useState, useRef } from "react";
import { Button, Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";

const PaymentResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
  const orderId = queryParams.get("vnp_TxnRef");
  const amount = queryParams.get("vnp_Amount");

  const successMessage =
    vnp_ResponseCode === "00" ? "Payment Successful!" : "Payment Unsuccessful!";

  const [createBookingDTO, setCreateBookingDTO] = useState(null);
  const [bookingDTO, setBookingDTO] = useState(null);
  const [isBookingCreated, setIsBookingCreated] = useState(false);

  // useRef to track if booking creation is attempted already
  const bookingAttempted = useRef(false);

  useEffect(() => {
    const savedBooking = localStorage.getItem("createBookingDTO");
    if (savedBooking && vnp_ResponseCode === "00" && !isBookingCreated && !bookingAttempted.current) {
      const bookingData = JSON.parse(savedBooking);
      setCreateBookingDTO(bookingData);
      createBooking(bookingData);
      bookingAttempted.current = true; // Mark as attempted
    }
  }, [vnp_ResponseCode, isBookingCreated]);

  const createBooking = async (bookingData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/bookings", {
        method: "POST",
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
      console.log(bookingResult);
      setBookingDTO(bookingResult.data);
      setIsBookingCreated(true); // Mark booking as created
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
            Veterinarian: {bookingDTO.veterinarianFullName || "Veterinarian will be available soon"}
          </Typography>
          <Typography variant="body1">
            Address: {bookingDTO.userAddress}
          </Typography>
          <Typography variant="body1">
            Start At: {bookingDTO.startedAt}
          </Typography>
          <Typography variant="body1">
            Status: {bookingDTO.statusEnum}
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