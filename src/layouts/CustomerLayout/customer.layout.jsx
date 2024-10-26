import { Box, Grid2 } from '@mui/material'
import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import AdminFooter from '../AdminFooter'
import AdminHeader from '../AdminHeader'
import { BG_COLOR } from '~/theme'
import Navbar from './Navbar'

function CustomerLayout() {
  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      height={'100%'}
      sx={{ m: 0, p: 0, bgcolor: BG_COLOR }}
    >
      <Container maxWidth={'xl'} container>
        <AdminHeader />
        <Box display={'flex'} justifyContent={'space-around'} gap={'50px'} px={'30px'}>
          <Box maxWidth={'200px'} width={'100%'}>
            <Navbar />
          </Box>
          <Box maxWidth={'1170px'} width={'100%'}>
            <Outlet />
          </Box>
        </Box>
        <AdminFooter />
      </Container>
    </Grid2>
  )
}

export default CustomerLayout