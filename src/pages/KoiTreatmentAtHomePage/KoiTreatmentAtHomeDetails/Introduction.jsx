import React from 'react';
import { Box, Typography } from '@mui/material';
import { BLUE_COLOR, ONLINE_BUTTON } from '~/theme';

function Introduction({ service }) {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ width: '600px', borderRadius: '26px' }}>
          <Typography
            sx={{
              fontFamily: 'SVN-Konga Pro',
              fontSize: '45px',
              color: BLUE_COLOR,
              display: 'flex',
              justifyContent: 'start',
            }}
          >
            {service.name}
          </Typography>

          <Typography
            sx={{
              textAlign: 'center',
              backgroundColor: ONLINE_BUTTON,
              color: 'white',
              width: 100,
              borderRadius: '10px',
              height: '30px',
            }}
          >
            {service.meetingMethod}
          </Typography>

          <Typography sx={{ fontWeight: 400, fontSize: 16, lineHeight: 2, marginTop: '20px' }}>
            {service.overview}
          </Typography>

          <Typography>
            <strong>Price:</strong> ${service.price}
          </Typography>

          <Typography>
            <strong>Estimated Time:</strong> {service.estimatedTime || "N/A"}
          </Typography>

          <Typography>
            <strong>Travel Price:</strong> {service.travelPricePerMeter || "N/A"} $/meter
          </Typography>

          <Typography>
            <strong>Address:</strong> {service.address || "N/A"}
          </Typography>
        </Box>
        <img
          src="https://cdn.shopify.com/s/files/1/1083/2612/files/koi2_480x480.jpg?v=1719301650"
          style={{ objectFit: 'contain', width: '500px', borderRadius: '26px' }}
          alt="Koi"
        />
      </Box>
    </div>
  );
}

export default Introduction;
