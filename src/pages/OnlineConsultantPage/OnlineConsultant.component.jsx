import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Button } from '@mui/material';
import Introduction from './OnlineConsultantDetail/Introduction';
import Content from './OnlineConsultantDetail/Content';
import ChooseOption from './OnlineConsultantDetail/ChooseOption';
import { useLocation } from 'react-router-dom';
// import BookingForm from './OnlineConsultantDetail/BookingForm';

const OnlineConsultantComponent = () => {
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

  const location = useLocation(); // Nhận dữ liệu từ state
  const { service } = location.state || {};
  console.log(service)

  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>
        {/* INTRODUCTION */}
        <Introduction service={service}/>
        {/* CONTENT  */}
        <Content service={service}/>
        {/* CHOOSE OPTION  */}
        <ChooseOption service={service}/>
        {/* Optionally render BookingForm based on service data */}
        {/* {<BookingForm />} */}
        
      </Box>
    </div>
  );
};

export default OnlineConsultantComponent;
