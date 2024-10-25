import { Box, Container, Grid2 } from '@mui/material'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { BG_COLOR } from '~/theme'
import AdminFooter from '../AdminFooter'
import Navbar from '~/layouts/VeterinarianLayout/Navbar'
import VeterinarianHeader from './VeterinarianHeader'
import ManagementApi from '~/api/ManagementApi'
import { useEffect } from 'react'

function veterinarian() {

  //auth
  const navigate = useNavigate();

  //auth
  useEffect(() => {
    const checkUserRole = async () => {
      const hasPermission = await ManagementApi.permitFor(["ADMIN", "MANAGER", "VETERIAN"]);
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
      <Container maxWidth={'xl'} container>
        <VeterinarianHeader />
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

export default veterinarian
