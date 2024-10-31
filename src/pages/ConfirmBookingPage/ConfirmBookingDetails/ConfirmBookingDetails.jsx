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

const ConfirmBookingDetails = () => {
  const location = useLocation(); // Nhận dữ liệu từ state
  const { createBookingDTO, serviceEntity, veterinarianEntity } =
    location.state;
  console.log(createBookingDTO);

  const totalPrice =
    createBookingDTO.servicePrice +
    createBookingDTO.travelPrice * createBookingDTO.distanceMeters;

  /**
   *
   * @param {*} orderId
   */
  const handlePayment = async (createBookingDTO) => {
    try {
      console.log(createBookingDTO.veterianId);

      // Lưu createBookingDTO vào localStorage
      localStorage.setItem(
        "createBookingDTO",
        JSON.stringify(createBookingDTO)
      );

      const token = localStorage.getItem("token"); // get token from localStorage

      //transaction.paymentMethod
      const paymentType = "BOOKING"; // Thay đổi theo giá trị của enum bạn đang sử dụng

      const paymentDto = {
        payment: paymentType, // Loại thanh toán
        totalPrice: totalPrice, // Giả sử bạn đã tính toán totalPrice ở đâu đó trong mã
      };

      const response = await fetch(
        `http://localhost:8080/vnpay/create-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Thêm Authorization header
          },
          body: JSON.stringify(paymentDto), // Gửi dữ liệu thanh toán lên API
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to create payment");
      }

      console.log(result);

      // Redirect người dùng tới URL thanh toán VNPay
      if (result.data) {
        window.location.href = result.data; // result.data sẽ là URL thanh toán VNPay trả về từ backend
      } else {
        throw new Error("Payment URL not found in response.");
      }
    } catch (error) {
      console.error("Error creating payment: ", error);
      alert(`Error creating payment: ${error.message}`);
    }
  };

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
                  {new Intl.NumberFormat("vi-VN").format(
                    createBookingDTO.travelPrice *
                      createBookingDTO.distanceMeters
                  )}{" "}
                  VND
                  {/* {createBookingDTO.travelPrice *
                    createBookingDTO.distanceMeters} */}
                </Typography>
              </Box>
            )}

          <Box display="flex" alignItems="center">
            <Typography fontWeight="bold" style={{ marginRight: "8px" }}>
              Service Price:
            </Typography>
            <Typography>
              {new Intl.NumberFormat("vi-VN").format(
                createBookingDTO.servicePrice
              )}{" "}
              VND
            </Typography>
          </Box>

          <Typography fontWeight="bold" variant="h5" textAlign="center">
            TOTAL PRICE:
            {new Intl.NumberFormat("vi-VN").format(totalPrice)} VND
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
            <Typography>
              {new Intl.NumberFormat("vi-VN").format(totalPrice)} VND
            </Typography>
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

export default ConfirmBookingDetails;
