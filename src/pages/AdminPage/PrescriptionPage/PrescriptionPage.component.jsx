import { Box } from '@mui/material'
import React from 'react'
import PrescriptionPageDetails from './PrescriptionPageDetails'
import Navbar from '../AdminPageDetails/Navbar'

function PrescriptionPage() {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'50px'} px={'30px'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <PrescriptionPageDetails />
      </Box>
    </Box>
  )
}

export default PrescriptionPage
