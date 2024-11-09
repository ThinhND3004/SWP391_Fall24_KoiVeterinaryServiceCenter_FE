import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Button,
  Typography,
  Divider,
  TextField,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { BLUE_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from "~/theme";
import api from "~/config/axios";
// import { cwd } from "process";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const ConfirmBookingDetails = () => {
  const location = useLocation(); // Nhận dữ liệu từ state
  const { createBookingDTO, serviceEntity, veterinarianEntity } = location.state;
  const displayedDateTime = dayjs.utc(createBookingDTO.startAt).tz("Asia/Ho_Chi_Minh", true);

  console.log(createBookingDTO);
  console.log(createBookingDTO.startAt);
  console.log(veterinarianEntity);

  const totalPrice =
    createBookingDTO.servicePrice +
    createBookingDTO.travelPrice * createBookingDTO.distanceMeters;

  /**
   *
   * @param {*} orderId
   */
  const handlePayment = async (createBookingDTO) => {
    try {
      console.log(createBookingDTO.veterianEmail);

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

      const response = await api.post(
        `/vnpay/create-payment`,
        {
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
    // display="flex"
    // justifyContent="center"
    // alignItems="center"
    // height="90vh"
    >
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ fontFamily: 'SVN-Konga Pro', fontSize: 50, color: BLUE_COLOR }}>Booking Summary</Typography>
        <img src='src\assets\images\Koi 3.png' style={{ width: '100px' }} />
      </Box>
      <Typography>Almost there! Check your booking summary below.</Typography>
      <div>
        <Box
          display="flex"
          // flexDirection="column"
          gap="20px" // Khoảng cách giữa các phần tử
          // px="30px"
          justifyContent={'space-between'}
          mb={5}
          mt={5}
        >

          {/* Box cot ben trai */}
          <Box>
            {/* Box le */}
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ marginRight: "8px", fontWeight: 500, fontSize: 16 }}>
                Service:
              </Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your first name'
                variant="outlined"
                value={serviceEntity.name}
                sx={{
                  width: '600px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    borderColor: BLUE_COLOR,
                    height: '60px',
                    marginTop: '15px',
                    '&.Mui-focused fieldset': {
                      borderColor: BLUE_COLOR
                    }
                  },
                  '& input': {
                    backgroundColor: INPUT_FIELD_COLOR,
                    padding: '20px 15px',
                    fontSize: '16px',
                    borderRadius: '15px'
                  }
                }}
              />
              {/* <Typography>{serviceEntity.name}</Typography> */}
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ marginRight: "8px", fontWeight: 500, fontSize: 16 }}>
                Veterinarian:
              </Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your first name'
                variant="outlined"
                value={veterinarianEntity?.fullName || "will be available soon"}
                sx={{
                  width: '600px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    borderColor: BLUE_COLOR,
                    height: '60px',
                    marginTop: '15px',
                    '&.Mui-focused fieldset': {
                      borderColor: BLUE_COLOR
                    }
                  },
                  '& input': {
                    backgroundColor: INPUT_FIELD_COLOR,
                    padding: '20px 15px',
                    fontSize: '16px',
                    borderRadius: '15px'
                  }
                }}
              />
              {/* <Typography>
              {veterinarianEntity?.fullName || "is not assigned"}
            </Typography> */}
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ marginRight: "8px", fontWeight: 500, fontSize: 16 }}>
                Type:
              </Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your first name'
                variant="outlined"
                value={serviceEntity.type}
                sx={{
                  width: '600px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    borderColor: BLUE_COLOR,
                    height: '60px',
                    marginTop: '15px',
                    '&.Mui-focused fieldset': {
                      borderColor: BLUE_COLOR
                    }
                  },
                  '& input': {
                    backgroundColor: INPUT_FIELD_COLOR,
                    padding: '20px 15px',
                    fontSize: '16px',
                    borderRadius: '15px'
                  }
                }}
              />
              {/* <Typography>{serviceEntity.type}</Typography> */}
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ marginRight: "8px", fontWeight: 500, fontSize: 16 }}>
                Meeting method:
              </Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your first name'
                variant="outlined"
                value={createBookingDTO.meetingMethod}
                sx={{
                  width: '600px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    borderColor: BLUE_COLOR,
                    height: '60px',
                    marginTop: '15px',
                    '&.Mui-focused fieldset': {
                      borderColor: BLUE_COLOR
                    }
                  },
                  '& input': {
                    backgroundColor: INPUT_FIELD_COLOR,
                    padding: '20px 15px',
                    fontSize: '16px',
                    borderRadius: '15px'
                  }
                }}
              />
              {/* <Typography>{createBookingDTO.meetingMethod}</Typography> */}
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ marginRight: "8px", fontWeight: 500, fontSize: 16 }}>
                Start At:
              </Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your first name'
                variant="outlined"
                value={displayedDateTime.format("DD/MM/YYYY HH:mm:ss")}
                sx={{
                  width: '600px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    borderColor: BLUE_COLOR,
                    height: '60px',
                    marginTop: '15px',
                    '&.Mui-focused fieldset': {
                      borderColor: BLUE_COLOR
                    }
                  },
                  '& input': {
                    backgroundColor: INPUT_FIELD_COLOR,
                    padding: '20px 15px',
                    fontSize: '16px',
                    borderRadius: '15px'
                  }
                }}
              />
              {/* <Typography>
              {dayjs(createBookingDTO.startAt).format("DD/MM/YYYY HH:mm")}
            </Typography> */}
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ marginRight: "8px", fontWeight: 500, fontSize: 16 }}>
                Additional Information:
              </Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your first name'
                variant="outlined"
                value={createBookingDTO.additionalInformation
                  ? createBookingDTO.additionalInformation
                  : "nothing"}
                sx={{
                  width: '600px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    borderColor: BLUE_COLOR,
                    height: '60px',
                    marginTop: '15px',
                    '&.Mui-focused fieldset': {
                      borderColor: BLUE_COLOR
                    }
                  },
                  '& input': {
                    backgroundColor: INPUT_FIELD_COLOR,
                    padding: '20px 15px',
                    fontSize: '16px',
                    borderRadius: '15px'
                  }
                }}
              />
              {/* <Typography>
              {createBookingDTO.additionalInformation
                ? createBookingDTO.additionalInformation
                : "nothing"}
            </Typography> */}
            </Box>
          </Box>


          {createBookingDTO.meetingMethod !== "OFFLINE_CENTER" &&
            createBookingDTO.meetingMethod !== "ONLINE" && (
              <Box display="flex" alignItems="center">
                <Typography sx={{ marginRight: "8px", fontWeight: 500, fontSize: 16 }}>
                  Address:
                </Typography>
                <Typography>{createBookingDTO.userAddress}</Typography>
              </Box>
            )}

          {createBookingDTO.meetingMethod !== "OFFLINE_CENTER" &&
            createBookingDTO.meetingMethod !== "ONLINE" && (
              <Box display="flex" alignItems="center">
                <Typography sx={{ marginRight: "8px", fontWeight: 500, fontSize: 16 }}>
                  Distance:
                </Typography>
                <Typography>{createBookingDTO.distanceMeters} km</Typography>
              </Box>
            )}

          {createBookingDTO.meetingMethod !== "OFFLINE_CENTER" &&
            createBookingDTO.meetingMethod !== "ONLINE" && (
              <Box display="flex" alignItems="center">
                <Typography sx={{ marginRight: "8px", fontWeight: 500, fontSize: 16 }}>
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

          <Box sx={{ width: 600, mt: 20 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ marginRight: "8px", fontWeight: 500, fontSize: 16 }}>
                Service Price:
              </Typography>
              {/* <TextField
                id="outlined-basic"
                placeholder='Enter your first name'
                variant="outlined"
                value={`${new Intl.NumberFormat("vi-VN").format(createBookingDTO.servicePrice)} VND`}
                sx={{
                  width: '600px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    borderColor: BLUE_COLOR,
                    height: '60px',
                    marginTop: '15px',
                    '&.Mui-focused fieldset': {
                      borderColor: BLUE_COLOR
                    }
                  },
                  '& input': {
                    backgroundColor: INPUT_FIELD_COLOR,
                    padding: '20px 15px',
                    fontSize: '16px',
                    borderRadius: '15px'
                  }
                }}
              /> */}
              <Typography>
                {new Intl.NumberFormat("vi-VN").format(
                  createBookingDTO.servicePrice
                )}{" "}
                VND
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" justifyContent={'space-between'} mt={2}>
              <Typography sx={{ marginRight: "8px", fontWeight: 500, fontSize: 16 }}>
                Amount:
              </Typography>
              <Typography>
                {new Intl.NumberFormat("vi-VN").format(totalPrice)} VND
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" justifyContent={'space-between'} mt={2}>
              <Typography sx={{ marginRight: "8px", fontWeight: 500, fontSize: 16 }}>
                Payment Method:
              </Typography>
              <img
                src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR.png"
                alt="VNPAY Logo"
                style={{ width: '80px' }}
              />
              {/* <Typography>VNPay</Typography> */}
            </Box>

            <Divider sx={{ my: 2, mt: 5 }} />
            <Box sx={{ mt: 5 }}>
              <Typography sx={{ fontWeight: 600, color: ORANGE_COLOR, fontSize: 20 }}>
                TOTAL PRICE:
                {new Intl.NumberFormat("vi-VN").format(totalPrice)} VND
              </Typography>
            </Box>

            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                sx={{
                  bgcolor: BLUE_COLOR,
                  borderRadius: '30px',
                  width: '250px',
                  height: '60px'
                }}
                variant="contained"
                color="secondary"
                onClick={() => handlePayment(createBookingDTO)}
              >
                Confirm Booking
              </Button>
            </Box>

          </Box>
        </Box>
      </div >
    </Box >
  );
};

export default ConfirmBookingDetails;
