import { Box, Container, Grid2 } from '@mui/material'
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { BG_COLOR } from '~/theme'
import AdminFooter from '../AdminFooter'
import Navbar from '~/layouts/VeterinarianLayout/Navbar'
import VeterinarianHeader from './VeterinarianHeader'
import ManagementApi from '~/api/ManagementApi'
import { useEffect } from 'react'
import { SnackbarProvider } from 'notistack'
import NotificationHandler from '~/components/NotificationHandler'

function veterinarian() {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  const fetchAccount = async () => {
    const data = await ManagementApi.getCurrentAccount();
    setAccount(data);
    console.log("ACCOUNT: ", data);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {
    
    if (account) {
      if (account.role !== 'VETERIAN') {
        navigate("/403");
      }
    }
  }, [account, navigate]);


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

      
      <SnackbarProvider maxSnack={5}>
         {/* Render NotificationHandler only if account is available */}
         {account && <NotificationHandler subscribeTo={'/topic/notifications/' + account.email} />}
      </SnackbarProvider>
    </Grid2>
  )
}

export default veterinarian
