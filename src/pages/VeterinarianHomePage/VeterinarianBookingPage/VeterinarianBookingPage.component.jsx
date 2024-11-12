import { Box, Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import VeterinarianBookingPageDetails from './VeterinarianBookingPageDetails'

function VeterinarianBookingPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
            Veterinarian
          </Typography>
          <Typography sx={{
            fontWeight: 600, fontSize: '20px'
          }}
          >
            Bookings Management
          </Typography>
        </Breadcrumbs>
      </Box>
      <VeterinarianBookingPageDetails />
    </Box>
  )
}

export default VeterinarianBookingPage
