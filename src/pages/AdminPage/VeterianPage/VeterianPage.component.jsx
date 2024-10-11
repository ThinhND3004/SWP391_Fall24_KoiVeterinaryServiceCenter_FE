import React from 'react'
import VeterianPageDetails from './VeterianPageDetails'
import Navbar from '../AdminPageDetails/Navbar'
import { Box, Breadcrumbs, Typography } from '@mui/material'

function VeterianPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
            Nguyen Van A
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