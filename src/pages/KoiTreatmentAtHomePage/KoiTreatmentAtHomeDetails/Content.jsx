import React from 'react';
import { Typography } from '@mui/material';

const Content = ({ service }) => {
  return (
    <div>
      {service && (
        <div>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 2,
            }}
          >
            {service.description}
          </Typography>

          {/* <Typography>
            <strong>Price:</strong> ${service.price}
          </Typography>

          <Typography>
            <strong>Estimated Time:</strong> {service.estimatedTime || 'N/A'}
          </Typography>

          <Typography>
            <strong>Address:</strong> {service.address || 'N/A'}
          </Typography> */}

          {service.isDisable && (
            <Typography sx={{ color: 'red' }}>
              This service is currently unavailable.
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default Content;
