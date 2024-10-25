import React from 'react';
import { Box, Typography } from '@mui/material'
import ProfilePageDetails from './ProfilePageDetails';

function StaffProfile() {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'50px'} px={'30px'}>
      <Box sx={{ display: 'flex' }}>
        <ProfilePageDetails />
      </Box>
    </Box>
  )
}

export default StaffProfile
