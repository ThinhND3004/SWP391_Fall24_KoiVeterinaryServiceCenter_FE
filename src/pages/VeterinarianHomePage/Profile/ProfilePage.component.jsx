import { Box } from '@mui/material'
import React from 'react'
import ProfilePageDetails from '~/pages/VeterinarianHomePage/Profile/ProfilePageDetails'

function ProfilePage() {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'50px'} px={'30px'}>
      <Box sx={{ display: 'flex' }}>
        <ProfilePageDetails />
      </Box>
    </Box>
  )
}

export default ProfilePage
