import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
// import { cwd } from "process";

const ConfirmBookingComponent = () => {
  const location = useLocation(); // Nhận dữ liệu từ state
  const bookingData = location.state;
  console.log(bookingData);

  const totalPrice =
    bookingData.servicePrice +
    bookingData.travelPricePerMeter * bookingData.distance;

  //sẽ sửa chức năng này sau

  // const handleBooking = async (bookingData) => {
  //   console.log(bookingData)
  //   try {
  //     const response = await fetch("http://localhost:8080/bookings", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(bookingData), // gửi bookingData lên API
  //     });

  //     const result = await response.json(); // Lấy dữ liệu phản hồi từ server
  //     if (!response.ok) {
  //       throw new Error(result.message || "Failed to create booking");
  //     }

  //     alert("Booking confirmed!");
  //     // Bạn có thể thêm logic chuyển hướng hoặc cập nhật trạng thái khác tại đây
  //   } catch (error) {
  //     console.error("Error creating booking: ", error);
  //     alert(`Error creating booking: ${error.message}`);
  //   }
  // };

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
            Service Name:
          </Typography>
          <Typography>{bookingData.serviceName}</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
            Type:
          </Typography>
          <Typography>{bookingData.serviceType}</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
            Meeting method:
          </Typography>
          <Typography>{bookingData.serviceMeetingMethod}</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
            Start At:
          </Typography>
          <Typography>{bookingData.startAt}</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
            Type:
          </Typography>
          <Typography>{bookingData.serviceType}</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
            Additional Information:
          </Typography>
          <Typography>{bookingData.additionalInformation}</Typography>
        </Box>

        {bookingData.serviceMeetingMethod !== "ONLINE" &&
        bookingData.serviceMeetingMethod !== "OFFLINE_CENTER" && (
            <>
              <Box display="flex" alignItems="center">
                <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
                  Address:
                </Typography>
                <Typography>{bookingData.userAddress}</Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
                  Distance:
                </Typography>
                <Typography>{bookingData.distance}</Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
                  Travel Cost:
                </Typography>
                <Typography>
                  {bookingData.travelPricePerMeter * bookingData.distance}
                </Typography>
              </Box>
            </>
          )}

        <Box display="flex" alignItems="center">
          <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
            Service Price:
          </Typography>
          <Typography>{bookingData.servicePrice}</Typography>
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
        // onClick={() => handleBooking(bookingData)}
      >
        Confirm Booking
      </Button>
    </div>
  );
};

export default ConfirmBookingComponent;
