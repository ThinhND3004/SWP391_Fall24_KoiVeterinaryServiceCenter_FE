import React from 'react';
import Title from './RequestAppointmentDetails/Title';
import InputField from './RequestAppointmentDetails/InputField';
import { Box } from '@mui/material';

function RequestAppointment() {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>
      <Title/>
      <InputField/>
      </Box>
    </div>
  );
}

export default RequestAppointment;
