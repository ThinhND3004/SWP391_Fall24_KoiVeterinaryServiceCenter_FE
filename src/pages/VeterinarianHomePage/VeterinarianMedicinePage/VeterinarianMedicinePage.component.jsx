import { Box, Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import VeterinarianMedicinePageDetails from './VeterinarianMedicinePageDetails'

function VeterinarianMedicinePage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%', marginLeft: '250px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
            Pham Luu Tuan Tai
          </Typography>
          <Typography sx={{
            fontWeight: 600, fontSize: '20px'
          }}
          >
            Medicines Management
          </Typography>
        </Breadcrumbs>
      </Box>
      <VeterinarianMedicinePageDetails />
    </Box>
  )
}

export default VeterinarianMedicinePage
