import React from 'react'
import { Box, Breadcrumbs, Typography } from '@mui/material'
import StaffPrescriptionPageDetails from './StaffPrescriptionPageDetails'

function StaffPrescriptionPage() {
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
            Prescriptions Management
          </Typography>
        </Breadcrumbs>
      </Box>
      <StaffPrescriptionPageDetails />
    </Box>
  )
}

export default StaffPrescriptionPage