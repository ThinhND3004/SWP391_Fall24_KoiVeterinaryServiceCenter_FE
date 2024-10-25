import { Box, Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import VeterinarianMedicalReportPageDetails from './VeterinarianMedicalReportPageDetails'

function VeterinarianMedicalReportPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
            Pham Luu Tuan Tai
          </Typography>
          <Typography sx={{
            fontWeight: 600, fontSize: '20px'
          }}
          >
            Medical Reports Management
          </Typography>
        </Breadcrumbs>
      </Box>
      <VeterinarianMedicalReportPageDetails />
    </Box>
  )
}

export default VeterinarianMedicalReportPage
