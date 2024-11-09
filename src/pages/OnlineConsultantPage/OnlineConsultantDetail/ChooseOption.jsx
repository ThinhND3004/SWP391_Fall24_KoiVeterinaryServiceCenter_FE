import React from 'react'
import { BLUE_COLOR, ORANGE_COLOR } from '~/theme'
import { Box, Typography, Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom';


function ChooseOption({ service, serviceAddress }) {
  const navigate = useNavigate(); // Hook từ React Router

  const handleFlexibleScheduleClick = () => {
    navigate('/select-veterian-by-any-time', { state: { service, serviceAddress } }); // Truyền state qua route
  };

  const handleSelectVeterianClick = () => {
    navigate('/service-choose-consultant', { state: { service, serviceAddress } });
  }

  return (
    <div>
      <Box sx={{ mb: 5 }}>
        {/* Grid to display options with images and descriptions */}
        <Grid container spacing={2}>
          {/* Select Doctor option */}
          <Grid item xs={6}>
            <Box textAlign="center">
              <img src="/src/images/select_veterian.png" alt="Select Doctor" style={{ width: '80px', marginBottom: '10px' }} />
              <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 500 }}>
                Choose a specific doctor based on availability.
              </Typography>
              <Button sx={{ borderRadius: '40px', height: '60px', width: '200px' }}
                variant="contained"
                color="secondary"
                onClick={handleSelectVeterianClick}
              >
                Select Veterinarian
              </Button>
            </Box>
          </Grid>

          {/* Flexible Schedule option */}
          <Grid item xs={6}>
            <Box textAlign="center">
              <img src="../src/assets/images/vaccination.png" alt="Flexible Schedule" style={{ width: '80px', marginBottom: '10px' }} />
              <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 500 }}>
                Let us assign a doctor for you at a flexible time.
              </Typography>
              <Button sx={{ borderRadius: '40px', height: '60px', width: '200px' }}
                variant="contained"
                color="secondary"
                onClick={handleFlexibleScheduleClick}
              >
                Flexible Schedule
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default ChooseOption