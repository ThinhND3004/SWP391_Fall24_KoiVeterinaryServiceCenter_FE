import { Box, Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import CustomerBookingPageDetails from './CustomerBookingPageDetails'

function CustomerBookingPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
            Customer
          </Typography>
          <Typography sx={{
            fontWeight: 600, fontSize: '20px'
          }}
          >
            Bookings Management
          </Typography>
        </Breadcrumbs>
      </Box>
      <CustomerBookingPageDetails />
    </Box>
  )
}

export default CustomerBookingPage
