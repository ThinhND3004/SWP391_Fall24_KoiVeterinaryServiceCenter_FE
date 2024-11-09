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
              <img src="/src/assets/images/doctor.png" alt="Select Veterian" style={{ width: '200px', marginBottom: '10px' }} />
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
            <Box textAlign="center" width="400px" marginLeft= '150px' >
              <img src="../src/assets/images/schedule.png" alt="Flexible Schedule" style={{ width: '200px', marginBottom: '10px' }} />
              <Typography variant="body1" sx={{ marginBottom: '10px', fontWeight: 500, width: '400px' }}>
              Select a time between 9 AM and 3 PM to choose a veterinarian, or let us assign one for you.
              </Typography>
              <Button sx={{ borderRadius: '40px', height: '60px', width: '200px'}}
                variant="contained"
                color="secondary"
                onClick={handleFlexibleScheduleClick}
              >
                Select Any Time
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default ChooseOption