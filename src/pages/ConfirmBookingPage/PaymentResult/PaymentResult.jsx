import React, { useEffect, useState, useRef } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { BLUE_COLOR, ORANGE_COLOR } from '~/theme';
import api from '~/config/axios';

const PaymentResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vnp_ResponseCode = queryParams.get('vnp_ResponseCode');
  const orderId = queryParams.get('vnp_TxnRef');
  const amount = queryParams.get('vnp_Amount');
  // const createAt = queryParams.get("vnp_CreateDate");

  const successMessage =
    vnp_ResponseCode === '00' ? 'Payment Successful!' : 'Payment Unsuccessful!';
  const [bookingDTO, setBookingDTO] = useState(null);
  const [isBookingCreated, setIsBookingCreated] = useState(false);

  // useRef to track if booking creation is attempted already
  const bookingAttempted = useRef(false);

  useEffect(() => {
    const BookingDTO = localStorage.getItem("BookingDTO");

    console.log(BookingDTO);
    if (
      // BookingDTO !== null &&
      vnp_ResponseCode === '00' //&&
    ) {
      const bookingData = JSON.parse(BookingDTO);
      updateStatus(bookingData);
    }

    console.log('Response Code:', vnp_ResponseCode);
    console.log('Order ID:', orderId);
    console.log('Amount:', amount);

    // Xóa createBookingDTO khỏi localStorage
    localStorage.removeItem('BookingDTO');
  }, [vnp_ResponseCode, isBookingCreated]);


  const updateStatus = async (bookingDTO) => {
    console.log(bookingDTO);

    try {

      const response = await api.put(`/bookings/change-status/${bookingDTO.id}`);

      if (!response) {
        throw new Error('Failed to change status');
      }

      const bookingResult = await response.data;

      console.log(bookingResult);

      setBookingDTO(bookingResult.data);
    } catch (error) {
      console.error('Error creating booking: ', error);
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: 26, mt: 2 }}
        color={vnp_ResponseCode === '00' ? 'green' : 'red'}>
        {successMessage}
      </Typography>
      <Typography sx={{ fontWeight: 500, fontSize: 18, mt: 2 }}>Order Code: {orderId}</Typography>
      <Typography sx={{ fontWeight: 700, fontSize: 18, color: ORANGE_COLOR, mt: 2 }}>Total Price: {new Intl.NumberFormat("vi-VN").format(amount/100)} VND</Typography>
      {/* <Typography variant="body1">Created At: {createAt}</Typography> */}



      {
        vnp_ResponseCode === '00' && bookingDTO && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center', fontWeight: 500, fontSize: 25, mt: 2 }}>Booking Details:</Typography>
            <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
              Customer Name: {bookingDTO.customerFullName}
            </Typography>
            <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
              Service: {bookingDTO.serviceName}
            </Typography>
            <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
              Meeting Method: {bookingDTO.meetingMethod}
            </Typography>
            <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
              Veterinarian: {bookingDTO.veterinarianFullName}
            </Typography>

            {bookingDTO.meetingMethod !== 'ONLINE' &&
              bookingDTO.meetingMethod !== 'OFFLINE_CENTER' && (
                <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                  Address: {bookingDTO.userAddress}
                </Typography>
              )}

            <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
              Start At: {bookingDTO.startedAt}
            </Typography>
            <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
              Status: {bookingDTO.statusEnum}
            </Typography>

            <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
              Created At: {bookingDTO.createdAt}
            </Typography>
          </Box>
        )
      }

      {
        vnp_ResponseCode !== '00' && (
          <Box>
            <Typography sx={{ fontWeight: 400 }}>
              Your payment could not be processed. Please try again.
            </Typography>
          </Box>
        )
      }
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => (window.location.href = '/home')}
          sx={{
            bgcolor: BLUE_COLOR,
            borderRadius: '30px',
            width: '150px',
            height: '50px',
            mb: 5,
            mt: 4
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Box >
  );
};

export default PaymentResult;
