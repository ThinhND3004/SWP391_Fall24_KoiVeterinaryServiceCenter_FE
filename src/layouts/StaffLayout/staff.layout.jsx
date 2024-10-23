import { Box, Grid2 } from '@mui/material'
import React from 'react'
import { Container } from 'react-bootstrap'
import AdminFooter from '../AdminFooter'
import Navbar from '../Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { BG_COLOR } from '~/theme'
import StaffHeader from './StaffHeader'
import { useEffect } from 'react'
import ManagementApi from '~/api/ManagementApi'

function StaffLayout() {

    //auth
    const navigate = useNavigate();

//auth
useEffect(() => {
  const checkUserRole = async () => {
    const hasPermission = await ManagementApi.permitFor(["ADMIN", "MANAGER", "STAFF"]);
    if (!hasPermission) {
      navigate("/403");
    }
  };

  checkUserRole();
}, [navigate]);

  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      height={'100%'}
      sx={{ m: 0, p: 0, bgcolor: BG_COLOR }}
    >
      <Container maxwidth={'xl'}>
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
