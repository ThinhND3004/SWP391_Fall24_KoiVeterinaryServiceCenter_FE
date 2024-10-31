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
// import { cwd } from "process";

const ConfirmBookingComponent = () => {
  const location = useLocation(); // Nhận dữ liệu từ state
  const { createBookingDTO, serviceEntity, veterinarianEntity } = location.state;
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
      console.log(createBookingDTO.startAt);

      // Lưu createBookingDTO vào localStorage
      localStorage.setItem("createBookingDTO", JSON.stringify(createBookingDTO));

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
    // display="flex"
    // justifyContent="center"
    // alignItems="center"
    // height="90vh"
    >
      <div>
        <Box
          // display="flex"
          // flexDirection="column"
          // gap="20px" 
          // px="30px"
          display={'flex'} flexDirection={'column'} gap={'10px'} px={'30px'}
        >
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography sx={{ fontFamily: 'SVN-Konga Pro', color: BLUE_COLOR, fontSize: 50 }}>
              Booking Summary
            </Typography>
            <img src='src\assets\images\Koi 3.png' style={{ width: '90px' }} />
          </Box>


          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
          }}>
            <Box>
              <Box alignItems="center" mb={3}>
                <Typography sx={{ marginRight: "8px", fontSize: '16px', fontWeight: 700 }}>
                  Service:
                </Typography>
                <TextField sx={{
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
                  id="outlined-basic"
                  variant="outlined"
                  value={serviceEntity.name || ''}
                  InputProps={{
                    readOnly: true, // Makes the TextField read-only
                  }}
                />

                {/* <Typography>{serviceEntity.name}</Typography> */}
              </Box>

              <Box alignItems="center" mb={3}>
                <Typography style={{ marginRight: "8px", fontSize: '16px', fontWeight: 700 }}>
                  Veterinarian:
                </Typography>
                {/* <Typography>
                  {veterinarianEntity?.fullName || "is not assigned"}
                </Typography> */}
                <TextField sx={{
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
                  id="outlined-basic"
                  variant="outlined"
                  value={veterinarianEntity?.fullName || "is not assigned"}
                  InputProps={{
                    readOnly: true, // Makes the TextField read-only
                  }}
                />
              </Box>

              <Box alignItems="center" mb={3}>
                <Typography style={{ marginRight: "8px", fontSize: '16px', fontWeight: 700 }}>
                  Type:
                </Typography>
                {/* <Typography>{serviceEntity.type}</Typography> */}
                <TextField sx={{
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
                  id="outlined-basic"
                  variant="outlined"
                  value={serviceEntity.type}
                  InputProps={{
                    readOnly: true, // Makes the TextField read-only
                  }}
                />
              </Box>

              <Box alignItems="center" mb={3}>
                <Typography style={{ marginRight: "8px", fontSize: '16px', fontWeight: 700 }}>
                  Meeting method:
                </Typography>
                {/* <Typography>{createBookingDTO.meetingMethod}</Typography> */}
                <TextField sx={{
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
                  id="outlined-basic"
                  variant="outlined"
                  value={createBookingDTO.meetingMethod}
                  InputProps={{
                    readOnly: true, // Makes the TextField read-only
                  }}
                />
              </Box>

              <Box alignItems="center" mb={3}>
                <Typography style={{ marginRight: "8px", fontSize: '16px', fontWeight: 700 }}>
                  Start At:
                </Typography>
                <Typography>
                  {/* {dayjs(createBookingDTO.startAt).format("DD/MM/YYYY HH:mm")} */}
                  <TextField sx={{
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
                    id="outlined-basic"
                    variant="outlined"
                    value={dayjs(createBookingDTO.startAt).format("DD/MM/YYYY HH:mm")}
                    InputProps={{
                      readOnly: true, // Makes the TextField read-only
                    }}
                  />
                </Typography>
              </Box>

              <Box alignItems="center" mb={3}>
                <Typography style={{ marginRight: "8px", fontSize: '16px', fontWeight: 700 }}>
                  Additional Information:
                </Typography>
                {/* <Typography>
                  {createBookingDTO.additionalInformation
                    ? createBookingDTO.additionalInformation
                    : "nothing"}
                </Typography> */}
                <TextField sx={{
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
                  id="outlined-basic"
                  variant="outlined"
                  value={createBookingDTO.additionalInformation
                    ? createBookingDTO.additionalInformation
                    : "nothing"}
                  InputProps={{
                    readOnly: true, // Makes the TextField read-only
                  }}
                />
              </Box>

              {createBookingDTO.meetingMethod !== "OFFLINE_CENTER" &&
                createBookingDTO.meetingMethod !== "ONLINE" && (
                  <Box display="flex" alignItems="center">
                    <Typography style={{ marginRight: "8px", fontSize: '16px', fontWeight: 700 }}>
                      Address:
                    </Typography>
                    <Typography>{createBookingDTO.userAddress}</Typography>
                  </Box>
                )}

              {createBookingDTO.meetingMethod !== "OFFLINE_CENTER" &&
                createBookingDTO.meetingMethod !== "ONLINE" && (
                  <Box display="flex" alignItems="center">
                    <Typography fontWeight="bold" style={{ marginRight: "8px", fontSize: '16px', fontWeight: 700 }}>
                      Distance:
                    </Typography>
                    <Typography>{createBookingDTO.distanceMeters} km</Typography>
                  </Box>
                )}

              {createBookingDTO.meetingMethod !== "OFFLINE_CENTER" &&
                createBookingDTO.meetingMethod !== "ONLINE" && (
                  <Box display="flex" alignItems="center">
                    <Typography fontWeight="bold" style={{ marginRight: "8px", fontSize: '16px', fontWeight: 700 }}>
                      Travel Cost:
                    </Typography>
                    <Typography>
                      $
                      {createBookingDTO.travelPrice *
                        createBookingDTO.distanceMeters}
                    </Typography>
                  </Box>
                )}


            </Box>

            {/* Payment */}
            <Box sx={{ width: 600, mt: 20 }}>
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }} >
                <Typography fontWeight="bold" style={{ marginRight: "8px", fontSize: '16px', fontWeight: 700 }}>
                  Service Price:
                </Typography>
                <Typography>${createBookingDTO.servicePrice}</Typography>
              </Box>
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }} >
                <Typography style={{ marginRight: "8px", fontSize: '16px', fontWeight: 700 }}>
                  Payment Method:
                </Typography>
                <Typography>VNPay</Typography>
              </Box>

              <Box display="flex" alignItems="center" mb={3} sx={{ justifyContent: 'space-between' }}>
                <Typography style={{ marginRight: "8px", fontSize: '16px', fontWeight: 700 }}>
                  Amount:
                </Typography>
                <Typography>${totalPrice}</Typography>
              </Box>

              <Divider sx={{ my: 2, mt: 5 }} />
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 20, color: ORANGE_COLOR }}>
                  TOTAL PRICE: ${totalPrice}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  sx={{ bgcolor: BLUE_COLOR, color: '#fff', borderRadius: '30px', width: '200px', height: '50px' }}
                  variant="contained"
                  onClick={() => handlePayment(createBookingDTO)}
                >
                  Confirm Booking
                </Button>
              </Box>

            </Box>

          </Box>

        </Box>
      </div >
    </Box >
  );
};

export default ConfirmBookingComponent;
