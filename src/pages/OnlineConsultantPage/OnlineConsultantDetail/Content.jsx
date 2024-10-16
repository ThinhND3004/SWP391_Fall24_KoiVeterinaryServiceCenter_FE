import React, { useState, useEffect } from 'react';
import { CircularProgress, Button, Typography } from '@mui/material';

const Content = ({service}) => {
  // const [service, setService] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const fetchService = async () => {
  //   setLoading(true); // Set loading to true at the beginning
  //   try {
  //     const response = await fetch('http://localhost:8080/services/online-consultant');
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();

  //     // Parse chuỗi JSON thành mảng thực sự cho implementationProcess và categories
  //     data.implementationProcess = JSON.parse(data.implementationProcess || '[]');
  //     data.categories = JSON.parse(data.categories || '[]');

  //     setService(data);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchService(); // Fetch service data when the component mounts
  // }, []);

  // if (loading) return <CircularProgress />; // Show a spinner while loading
  // if (error) return (
  //   <div>
  //     <p>Error: {error}</p>
  //     <Button variant="contained" onClick={fetchService}>Retry</Button>
  //   </div>
  // );

  return (
    <div>
      {/* <h2>Service Details</h2> */}

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
          
          
          {/* <p><strong>Estimated Time:</strong> {service.estimatedTime || 'N/A'} minutes</p> */}

          {/* Hiển thị categories nếu có */}
          {/* <h3>Categories:</h3>
          <ul>
            {Array.isArray(service.categories) ? (
              service.categories.map((category, index) => (
                <li key={index}>{category}</li>
              ))
            ) : (
              <p>No categories available</p>
            )}
          </ul> */}

          {/* Hiển thị quá trình thực hiện nếu có */}
          {/* <h3>Implementation Process:</h3>
          <ol>
            {Array.isArray(service.implementationProcess) ? (
              service.implementationProcess.map((step, index) => (
                <li key={index}>{step}</li>
              ))
            ) : (
              <p>No implementation process available</p>
            )}
          </ol> */}

          {/* Nếu service đã bị disable, hiển thị thông báo */}
          {service.isDisable && <p style={{ color: 'red' }}>This service is currently unavailable.</p>}
          </Typography>
        </div>
      )}

      {/* Add additional content rendering based on service data */}
    </div>
  );
};

export default Content;
