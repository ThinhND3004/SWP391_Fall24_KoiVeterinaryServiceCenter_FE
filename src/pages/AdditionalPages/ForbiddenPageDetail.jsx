import React from 'react';
import { Container, Typography, Button, Box, CircularProgress } from '@mui/material';
import { BLUE_COLOR, GRAY_COLOR } from '~/theme';
import ReportIcon from '@mui/icons-material/Report'

const ForbiddenPageDetail = () => {
  return (
    <Box sx={{
      backgroundImage: 'url("src/assets/images/bg.png")',
      backgroundSize: '90%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '70vh',
      padding: '20px'
    }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 10
        }}>
        <Typography sx={{ fontFamily: 'SVN-Konga Pro', fontSize: '200px', color: BLUE_COLOR }}>
          403
        </Typography>

        <Typography sx={{ textTransform: 'uppercase', fontSize: '40px', fontWeight: 600, color: GRAY_COLOR }}>
          You shall not pass!
        </Typography>

        <Typography sx={{ mb: 3, fontSize: '15px', fontWeight: 400, color: GRAY_COLOR }}>
          {/* YOU SEEM TO BE TRYING TO FIND YOUR WAY HOME */}
          You seem to be trying to find your way home
        </Typography>

        <Button
          variant="contained"
          color="primary"
          href="/home"
          sx={{
            borderRadius: '40px',
            boxShadow: 'none',
            bgcolor: BLUE_COLOR,
            color: '#fff',
            width: '200px',
            height: '60px',
            mb: 5,
            fontSize: '16px'
          }}
        >
          Back to home page
        </Button>
      </Box>
    </Box >
  );
};

export default ForbiddenPageDetail;