import { Box } from '@mui/material'
import React from 'react'
import PasswordPageDetails from './PasswordPageDetails'

function StaffPasswordPage() {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>
        <PasswordPageDetails />
      </Box>
    </div>
  )
}

export default StaffPasswordPage