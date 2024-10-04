import { Container, Grid2 } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { BG_COLOR } from '~/theme'
import AdminHeader from '~/layouts/AdminHeader'
import AdminFooter from '../AdminFooter'

function AdminLayout() {
  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      sx={{ m: 0, p: 0, bgcolor: BG_COLOR }}
    >

      <Container maxWidth={'xl'}>
        <AdminHeader />
        <Outlet />
        <AdminFooter />
      </Container>
    </Grid2>
  )
}

export default AdminLayout
