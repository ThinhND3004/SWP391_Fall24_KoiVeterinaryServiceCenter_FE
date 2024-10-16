import React from 'react';
import { Box, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom';
import BookingForm from './BookingFlexibleScheduleDetails/BookingForm';
// import Introduction from '../ContactUs/ContactPageDetails/Introduction';
// import App from './BookingFlexibleScheduleDetails/App';
import Introduction from './BookingFlexibleScheduleDetails/Introduction';
import Test2 from './BookingFlexibleScheduleDetails/Test2'


const BookingFlexibleScheduleComponent = () => {
  const location = useLocation(); // Nhận dữ liệu từ state
  const { service } = location.state || {};
  console.log(service)
  return (
    <>
      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>
        
        <Introduction service = {service}/>
        <BookingForm service = {service}/>
        {/* <Test2/> */}

      </Box>
    </>
  );
}

export default BookingFlexibleScheduleComponent;