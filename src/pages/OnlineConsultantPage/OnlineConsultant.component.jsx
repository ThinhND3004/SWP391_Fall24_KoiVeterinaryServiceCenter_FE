import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Button } from '@mui/material';
import Introduction from './OnlineConsultantDetail/Introduction';
import Content from './OnlineConsultantDetail/Content';
import ChooseOption from './OnlineConsultantDetail/ChooseOption';
import { useLocation } from 'react-router-dom';

const OnlineConsultantComponent = () => {
  const location = useLocation(); // Nhận dữ liệu từ state
  const { service } = location.state || {};
  console.log(service)

  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>
        {/* INTRODUCTION */}
        <Introduction service={service}/>
        {/* CONTENT  */}
        <Content service={service}/>
        {/* CHOOSE OPTION  */}
        <ChooseOption service={service}/>
        
      </Box>
    </div>
  );
};

export default OnlineConsultantComponent;