import { Box } from '@mui/material'
import React from 'react'
import DashboardVeterinarianDetails from './DashboardVeterinarianDetails'

function DashboardVeterinariansPage() {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'50px'} px={'30px'}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <DashboardVeterinarianDetails />
        </Box>
      </Box>
    </div>
  )
}

export default DashboardVeterinariansPage
