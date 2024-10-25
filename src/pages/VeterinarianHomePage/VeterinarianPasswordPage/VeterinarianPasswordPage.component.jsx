import { Box } from '@mui/material'
import React from 'react'
import VeterinarianPasswordPageDetails from './VeterinarianPasswordPageDetails'

function VeterinarianPasswordPage() {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'}>
        <VeterinarianPasswordPageDetails />
      </Box>
    </div>
  )
}

export default VeterinarianPasswordPage
