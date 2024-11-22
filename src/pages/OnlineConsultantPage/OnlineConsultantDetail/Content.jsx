import React from 'react';
import { Typography, Box } from '@mui/material';

const Content = ({ service }) => {
  return (
    <Box>
      {service && (
        <Box>
          <Typography sx={{ fontWeight: 400, fontSize: 16, lineHeight: 2 }} 
            component="div" // Use "div" to ensure block-level rendering
            dangerouslySetInnerHTML={{ __html: service.description }} // Render HTML
          />

<Typography
              sx={{
                fontSize: 20,
                marginTop: 2,
                fontWeight: 700,
              }}
            >
              * Important Notes:
            </Typography>

            <Typography
              sx={{
                // fontSize: 18,
                marginTop: 2,
              }}
            >
              - If you have any question, please
              contact us at{" "}
              <Box component="span" sx={{ fontWeight: 700 }}>
                0829207487
              </Box>
            </Typography>

            <Typography
              sx={{
                // fontSize: 18,
                marginTop: 1,
                marginBottom: 8,
              }}
            >
              - If you want to cancel booking, please cancel{" "}
              <Box component="span" sx={{ fontWeight: 700 }}>
                at least 12 hours
              </Box>{" "}
              in advance for processing and refund assistance. If cancellation
              occurs{" "}
              <Box component="span" sx={{ fontWeight: 700 }}>
                after 12 hours
              </Box>{" "}
              , a refund will not be issued.
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

