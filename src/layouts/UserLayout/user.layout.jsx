import { Box, Container, Grid2 } from '@mui/material'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { BG_COLOR } from '~/theme'
import AdminHeader from '~/layouts/AdminHeader'
import AdminFooter from '../AdminFooter'
import Navbar from '~/pages/AdminPage/AdminPageDetails/Navbar'
import ManagementApi from '~/api/ManagementApi'
import { useEffect } from 'react'

function UserLayout() {

  const navigate = useNavigate();

  // //auth
  // useEffect(() => {
  //   const checkUserRole = async () => {
  //     const hasPermission = await ManagementApi.permitFor(["ADMIN"]);
  //     if (!hasPermission) {
  //       navigate("/403");
  //     }
  //   };

  //   checkUserRole();
  // }, [navigate]);

  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      height={'100%'}
      sx={{ m: 0, p: 0, bgcolor: BG_COLOR }}
    >
      <Container maxWidth={'xl'}>
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

export default UserLayout
