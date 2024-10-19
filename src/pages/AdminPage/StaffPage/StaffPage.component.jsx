import React from 'react'
import Navbar from '../AdminPageDetails/Navbar'
import CustomerPageDetails from '~/pages/AdminPage/StaffPage/StaffPageDetails'
import { Box, Breadcrumbs, Typography } from '@mui/material'

function CustomerPage() {
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
            Staffs Management
          </Typography>
        </Breadcrumbs>
      </Box>
      <CustomerPageDetails />
    </Box>

  )
}

export default CustomerPage
