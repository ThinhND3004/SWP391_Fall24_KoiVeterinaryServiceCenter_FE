import React from 'react'
import { Box, Breadcrumbs, Typography } from '@mui/material'
import StaffVeterinarianPageDetails from './StaffVeterinarianPageDetails'

function StaffVeterinarianPage() {
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
      <StaffVeterinarianPageDetails />
    </Box>
  )
}

export default StaffVeterinarianPage
