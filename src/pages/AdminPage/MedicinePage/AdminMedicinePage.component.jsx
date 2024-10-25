import React from 'react'
import AdminMedicinePageDetails from './AdminMedicinePageDetails'
import { Box, Breadcrumbs, Typography } from '@mui/material'

function AdminMedicinePage() {
  return (
    <div>
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
              Medicines Management
            </Typography>
          </Breadcrumbs>
        </Box>
        <AdminMedicinePageDetails />
      </Box>
    </div>
  )
}

export default AdminMedicinePage
