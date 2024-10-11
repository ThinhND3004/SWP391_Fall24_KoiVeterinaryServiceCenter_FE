import React from 'react'
import VeterianPageDetails from './VeterianPageDetails'
import Navbar from '../AdminPageDetails/Navbar'
import { Box } from '@mui/material'

function VeterianPage() {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'50px'} px={'30px'}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <VeterianPageDetails />
        </Box>
      </Box>
    </div>
  )
}

export default VeterianPage