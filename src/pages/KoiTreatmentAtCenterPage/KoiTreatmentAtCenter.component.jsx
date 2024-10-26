import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Button } from '@mui/material';
import Introduction from './KoiTreatmentAtCenterDetails/Introduction';
import Content from './KoiTreatmentAtCenterDetails/Content';
import ChooseOption from './KoiTreatmentAtCenterDetails/ChooseOption';
import { useLocation } from 'react-router-dom';

const KoiTreatmentAtCenterComponent = () => {

  const location = useLocation(); // Nhận dữ liệu từ state
  const { service, serviceAddress } = location.state || {};
  console.log("SERVICE DTO: ", service)

  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>
        {/* INTRODUCTION */}
        <Introduction service={service} serviceAddress={serviceAddress}/>
        {/* CONTENT  */}
        <Content service={service}/>
        {/* CHOOSE OPTION  */}
        <ChooseOption service={service} serviceAddress={serviceAddress}/>
        {/* Optionally render BookingForm based on service data */}
        {/* {<BookingForm />} */}
        
      </Box>
    </div>
  );
};

export default KoiTreatmentAtCenterComponent;