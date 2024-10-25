import React from 'react'
import { Box, Breadcrumbs, Typography } from '@mui/material'
import StaffCustomerPageDetails from './StaffCustomerPageDetails'

function StaffCustomerPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
            Staff
          </Typography>
          <Typography sx={{
            fontWeight: 600, fontSize: '20px'
          }}
          >
            Customers Management
          </Typography>
        </Breadcrumbs>
      </Box>
      <StaffCustomerPageDetails />
    </Box>
  )
}

export default StaffCustomerPage
