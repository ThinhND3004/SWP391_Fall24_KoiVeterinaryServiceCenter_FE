import React from 'react';
import { Typography, Box } from '@mui/material';

const Content = ({ service }) => {
  return (
    <Box>
      {service && (
        <Box>
          <Typography sx={{ fontWeight: 400, fontSize: 16, lineHeight: 2 }}>
            {service.description}
          </Typography>

          {service.isDisable && (
            <Typography sx={{ color: 'red', marginTop: 1 }}>
              This service is currently unavailable.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Content;
