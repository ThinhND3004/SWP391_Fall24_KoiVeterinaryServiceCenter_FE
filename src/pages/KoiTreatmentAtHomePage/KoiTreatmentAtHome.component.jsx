import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Button } from '@mui/material';
import Introduction from './KoiTreatmentAtHomeDetails/Introduction';
import Content from './KoiTreatmentAtHomeDetails/Content';
import ChooseOption from './KoiTreatmentAtHomeDetails/ChooseOption';
import { useLocation } from 'react-router-dom';

const KoiTreatmentAtHomeComponent = () => {

  const location = useLocation(); // Nhận dữ liệu từ state
  const { service, serviceAddress } = location.state || {};
  console.log(service)
  console.log(serviceAddress);

  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'} paddingBottom={'50px'}>
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

export default KoiTreatmentAtHomeComponent;