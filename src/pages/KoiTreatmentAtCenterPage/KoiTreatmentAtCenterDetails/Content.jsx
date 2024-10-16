import React, { useState, useEffect } from 'react';
import { CircularProgress, Button, Typography } from '@mui/material';

const Content = ({service}) => {
  return (
    <div>
      {service && (
        <div>
          {/* Hiển thị dữ liệu chi tiết của service */}
          <Typography sx={{ 
            fontWeight: 400, 
            fontSize: 16, 
            lineHeight: 2, 
            // marginTop: '20px' 
            }}>
          {/* <p>
            <strong>Price:</strong> ${service.price}
          </p>
          <p>
            <strong>Estimated Time:</strong> {service.estimatedTime || 'N/A'}
          </p> */}
          <p>
            {service.description}
          </p>
          {/* <p>
            <strong>Address:</strong> {service.address || 'N/A'}
          </p> */}
          {service.isDisable && <p style={{ color: 'red' }}>This service is currently unavailable.</p>}
          </Typography>
        </div>
      )}

      {/* Add additional content rendering based on service data */}
    </div>
  );
};

export default Content;
