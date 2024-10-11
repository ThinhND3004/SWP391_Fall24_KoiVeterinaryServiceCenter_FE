import React from 'react'
import Navbar from '../AdminPageDetails/Navbar'
import { Box } from '@mui/material'
import Profile from '../AdminPageDetails/Profile'
import PasswordPageDetails from './PasswordPageDetails'

function PasswordPage() {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'50px'} px={'30px'}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <PasswordPageDetails />
        </Box>
      </Box>
    </div>
  )
}

export default PasswordPage
