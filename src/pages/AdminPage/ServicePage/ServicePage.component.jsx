import { Box, Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import BookingPageDetails from './BookingPageDetails'
import Navbar from '../AdminPageDetails/Navbar'

function BookingPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
            Admin
          </Typography>
          <Typography sx={{
            fontWeight: 600, fontSize: '20px'
          }}
          >
            Services Management
          </Typography>
        </Breadcrumbs>
      </Box>
      <BookingPageDetails />
    </Box>
  )
}

export default BookingPage
