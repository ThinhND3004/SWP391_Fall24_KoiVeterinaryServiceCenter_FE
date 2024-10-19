import React from 'react';
import { Box, Typography } from '@mui/material'
import ProfilePageDetails from './ProfilePageDetails';

function StaffProfile() {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'50px'} px={'30px'}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <ProfilePageDetails />
        </Box>
      </Box>
    </div >
  )
}

export default StaffProfile
