import { Box } from '@mui/material'
import React from 'react'
import CustomerProfileDetails from './CustomerProfilePage/CustomerProfileDetails'

function CustomerProfile() {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'50px'} px={'30px'}>
      <Box sx={{ display: 'flex' }}>
        < CustomerProfileDetails />
      </Box>
    </Box>
  )
}

export default CustomerProfile
