import { Box } from '@mui/material'
import React from 'react'
import DashboardPageDetails from './DashboardBookingsPageDetails'

function DashboardBookingPage() {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'50px'} px={'30px'}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <DashboardPageDetails />
        </Box>
      </Box>
    </div>
  )
}

export default DashboardBookingPage
