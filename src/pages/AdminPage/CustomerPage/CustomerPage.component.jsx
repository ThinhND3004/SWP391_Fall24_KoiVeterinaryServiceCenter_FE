import React from 'react'
import Navbar from '../AdminPageDetails/Navbar'
import CustomerPageDetails from '~/pages/AdminPage/CustomerPage/CustomerPageDetails'
import { Box, Breadcrumbs, Typography } from '@mui/material'

function CustomerPage() {
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
            Customers Management
          </Typography>
        </Breadcrumbs>
      </Box>
      <CustomerPageDetails />
    </Box>

  )
}

export default CustomerPage
