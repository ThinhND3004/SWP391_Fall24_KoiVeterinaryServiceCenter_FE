import React from 'react';
import { Container, Typography, Button, Box, CircularProgress } from '@mui/material';

const ForbiddenPageDetail = () => {
  return (
    <Container 
      component="main" 
      maxWidth="xs" 
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <CircularProgress />
      </Box>
      <Typography variant="h1" sx={{ fontSize: '4rem' }}>
        403
      </Typography>
      <Typography variant="h5" sx={{ textTransform: 'uppercase', mb: 2 }}>
        Bạn không có quyền truy cập !
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        YOU SEEM TO BE TRYING TO FIND HIS WAY HOME
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        href="/home"
        sx={{ borderRadius: '20px' }}
      >
        Về trang chủ
      </Button>
      <footer style={{ marginTop: 'auto', textAlign: 'center', width: '100%' }}>
        2018 © Pixel Admin.
      </footer>
    </Container>
  );
};

export default ForbiddenPageDetail;