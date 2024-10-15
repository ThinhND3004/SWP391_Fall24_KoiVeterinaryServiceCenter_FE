import { Box } from '@mui/material'
import React from 'react'
import ProfilePageDetails from '~/pages/VeterinarianHomePage/Profile/ProfilePageDetails'

function ProfilePage() {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>
        <ProfilePageDetails />
      </Box>
    </div>
  )
}

export default ProfilePage
