import React from 'react'
import { Box, Breadcrumbs, Typography } from '@mui/material'
import StaffPrescriptionPageDetails from './StaffPrescriptionPageDetails'

function StaffPrescriptionPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%', marginLeft: '250px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
            Nguyen Van A
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