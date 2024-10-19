import { Box, Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import PrescriptionPageDetails from './KoiSpeciesPageDetails'
import Navbar from '../AdminPageDetails/Navbar'

function PrescriptionPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%', marginLeft: '250px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
            Admin
          </Typography>
          <Typography sx={{
            fontWeight: 600, fontSize: '20px'
          }}
          >
            Koi Species Management
          </Typography>
        </Breadcrumbs>
      </Box>
      <PrescriptionPageDetails />
    </Box>
  )
}

export default PrescriptionPage
