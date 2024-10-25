import React from 'react';
import { Box, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom';
import BookingForm from './AdditionalInfoDetails/BookingForm';
import Introduction from './AdditionalInfoDetails/Introduction';

const AdditionalInfoBookingComponent = () => {
  const location = useLocation(); // Nhận dữ liệu từ state
  const { service, serviceAddress, veterinarian, selectedDateTime } = location.state || {};
  console.log("SERVICE",service)
  console.log("SERVICE ADDRESS",serviceAddress)
  console.log("VETERIAN",veterinarian)
  console.log("SELECTED DATE TIME",selectedDateTime)
  return (
    <>  
      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>
        
        <Introduction service = {service} serviceAddress={serviceAddress} veterinarian={veterinarian}/>
        <BookingForm service = {service} selectedDateTime={selectedDateTime} veterinarian={veterinarian}/>
      </Box>
    </>
  );
}

export default AdditionalInfoBookingComponent;