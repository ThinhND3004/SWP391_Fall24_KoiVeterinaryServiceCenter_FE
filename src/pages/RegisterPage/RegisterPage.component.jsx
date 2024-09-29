import React from 'react'
import RegisterPageDetails from './RegisterPageDetails'
import { Box } from '@mui/material'

function RegisterPage() {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>
        {/* Title */}
        <RegisterPageDetails />
      </Box>
    </div>
  )
}

export default RegisterPage
