import { Box, Typography } from '@mui/material'
import React from 'react'
import Navbar from './AdminPageDetails/Navbar'
import Profile from './AdminPageDetails/Profile'
import { Outlet } from 'react-router-dom'

function AdminPage() {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'50px'} px={'30px'}>
        <Box sx={{ display: 'flex' }}>
          <Profile />
        </Box>
      </Box>
    </div >
  )
}

export default AdminPage
