import { Box } from '@mui/material'
import React from 'react'
import VeterinarianPasswordPageDetails from './VeterinarianPasswordPageDetails'

function VeterinarianPasswordPage() {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>
        <VeterinarianPasswordPageDetails />
      </Box>
    </div>
  )
}

export default VeterinarianPasswordPage
