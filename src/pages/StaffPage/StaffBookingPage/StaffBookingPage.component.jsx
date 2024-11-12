import React from 'react'
import BookingPageDetails from './BookingPageDetails'
import { Box, Breadcrumbs, Typography } from '@mui/material'

function StaffBookingPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
            Staff
          </Typography>
          <Typography sx={{
            fontWeight: 600, fontSize: '20px'
          }}
          >
            Bookings Management
          </Typography>
        </Breadcrumbs>
      </Box>
      <BookingPageDetails />
    </Box>
  )
}

export default StaffBookingPage
