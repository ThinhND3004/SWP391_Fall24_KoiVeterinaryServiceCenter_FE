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
      {/* Grid to display options with images and descriptions */}
      <Grid container spacing={2}>
        {/* Select Doctor option */}
        <Grid item xs={6}>
          <Box textAlign="center">
            <img src="/images/select-doctor.png" alt="Select Doctor" style={{ width: '80px', marginBottom: '10px' }} />
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              Choose a specific doctor based on availability.
            </Typography>
            <Button
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
            <img src="/images/flexible-schedule.png" alt="Flexible Schedule" style={{ width: '80px', marginBottom: '10px' }} />
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              Let us assign a doctor for you at a flexible time.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              // onClick={() => window.location.href = '/booking-flexible-schedule'}
              onClick={handleFlexibleScheduleClick}
            >
              Flexible Schedule
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default ChooseOption