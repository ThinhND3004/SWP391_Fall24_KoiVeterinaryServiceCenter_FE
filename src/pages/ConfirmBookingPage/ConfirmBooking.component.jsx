import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
// import { cwd } from "process";

const ConfirmBookingComponent = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="90vh"
    >
      <div>
        <Box
          display="flex"
          flexDirection="column"
          gap="20px" // Khoảng cách giữa các phần tử
          px="30px"
        >
          <Typography variant="h4" fontWeight="bold" textAlign="center">
            Booking Summary
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
              {veterinarianEntity?.fullName || "is not assigned"}
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
            <Typography>
              {dayjs(createBookingDTO.startAt).format("DD/MM/YYYY HH:mm")}
            </Typography>
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
                <Typography>{createBookingDTO.distanceMeters} km</Typography>
              </Box>
            )}

          {createBookingDTO.meetingMethod !== "OFFLINE_CENTER" &&
            createBookingDTO.meetingMethod !== "ONLINE" && (
              <Box display="flex" alignItems="center">
                <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
                  Travel Cost:
                </Typography>
                <Typography>
                  $
                  {createBookingDTO.travelPrice *
                    createBookingDTO.distanceMeters}
                </Typography>
              </Box>
            )}

          <Box display="flex" alignItems="center">
            <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
              Service Price:
            </Typography>
            <Typography>${createBookingDTO.servicePrice}</Typography>
          </Box>

          <Typography fontWeight="bold" variant="h5" textAlign="center">
            TOTAL PRICE: ${totalPrice}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" alignItems="center">
            <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
              Payment Method:
            </Typography>
            <Typography>VNPay</Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
              Amount:
            </Typography>
            <Typography>${totalPrice}</Typography>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => handlePayment(createBookingDTO)}
          >
            Confirm Booking
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default ConfirmBookingComponent;
