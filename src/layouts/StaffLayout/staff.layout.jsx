import { Box, Grid2 } from '@mui/material'
import React from 'react'
import { Container } from 'react-bootstrap'
import AdminFooter from '../AdminFooter'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { BG_COLOR } from '~/theme'
import StaffHeader from './StaffHeader'

function StaffLayout() {
  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      height={'100%'}
      sx={{ m: 0, p: 0, bgcolor: BG_COLOR }}
    >
      <Container maxWidth={'xl'}>
        <StaffHeader />
        <Box display={'flex'} gap={'50px'} px={'30px'}>
          <Navbar />
          <Outlet />
        </Box>
        <AdminFooter />
      </Container>
    </Grid2>
  )
}

export default StaffLayout
