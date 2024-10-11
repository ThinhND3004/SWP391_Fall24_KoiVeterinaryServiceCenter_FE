import React from 'react';
import { Box, Typography } from '@mui/material'
import ProfilePageDetails from './ProfilePageDetails';

function StaffProfile() {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>
        <ProfilePageDetails />
      </Box>
    </div>
  )
}

export default StaffProfile
