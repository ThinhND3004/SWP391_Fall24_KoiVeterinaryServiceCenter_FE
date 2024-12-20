import React from 'react'
import VeterianPageDetails from './VeterianPageDetails'
import Navbar from '../AdminPageDetails/Navbar'
import { Box, Breadcrumbs, Typography } from '@mui/material'

function VeterianPage() {
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
            Veterinarians Management
          </Typography>
        </Breadcrumbs>
      </Box>
      <VeterianPageDetails />
    </Box>
  )
}

export default VeterianPage