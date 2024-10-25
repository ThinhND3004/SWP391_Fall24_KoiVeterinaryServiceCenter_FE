import { Box } from '@mui/material'
import React from 'react'
import PasswordPageDetails from './PasswordPageDetails'

function StaffPasswordPage() {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'}>
        <PasswordPageDetails />
      </Box>
    </div>
  )
}

export default StaffPasswordPage