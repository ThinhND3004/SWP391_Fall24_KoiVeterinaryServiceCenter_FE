import { Box } from '@mui/material'
import React from 'react'
import BookingPageDetails from './BookingPageDetails'
import Navbar from '../AdminPageDetails/Navbar'

function BookingPage() {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'50px'} px={'30px'}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Navbar />
          <BookingPageDetails />
        </Box>
      </Box>
    </div>
  )
}

export default BookingPage
