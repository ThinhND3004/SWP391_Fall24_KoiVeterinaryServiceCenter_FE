import { Box, Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import DeliveryPageDetails from './DeliveryPageDetails'

function DeliveryPage() {
  return (
    <div>
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
              Deliveries Management
            </Typography>
          </Breadcrumbs>
        </Box>
        <DeliveryPageDetails />
      </Box>
    </div>
  )
}

export default DeliveryPage
