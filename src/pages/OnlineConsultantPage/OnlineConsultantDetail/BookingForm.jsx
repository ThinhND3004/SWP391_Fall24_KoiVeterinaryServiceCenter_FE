// import * as React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { TextField, Box, Button } from '@mui/material';

// export default function BookingForm() {
//   const [dateTime, setDateTime] = React.useState(null);
//   const [address, setAddress] = React.useState('');
//   const [additionalInfo, setAdditionalInfo] = React.useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission and travel cost calculation here
//     console.log('DateTime:', dateTime);
//     console.log('Address:', address);
//     console.log('Additional Information:', additionalInfo);
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DateTimePicker']}>
//         <DateTimePicker
//           label="Select Date and Time"
//           value={dateTime}
//           onChange={(newValue) => setDateTime(newValue)}
//           sx={{ width: '100%' }} // Full width for DateTimePicker
//         />
//       </DemoContainer>
//       <Box sx={{ marginTop: '20px' }}>
//         <TextField
//           label="Enter Address"
//           variant="outlined"
//           fullWidth
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           sx={{ width: '100%' }} // Full width for Address field
//         />
//       </Box>
//       <Box sx={{ marginTop: '20px' }}>
//         <TextField
//           label="Additional Information (optional)"
//           variant="outlined"
//           multiline // Allows for multiple lines of text
//           rows={4} // Height of the field
//           fullWidth
//           value={additionalInfo}
//           onChange={(e) => setAdditionalInfo(e.target.value)}
//           sx={{ width: '100%' }} // Full width for Additional Info field
//         />
//       </Box>
//       <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ marginTop: '20px' }}>
//         Submit
//       </Button>
//     </LocalizationProvider>
//   );
// }


import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField, Box, Button, Snackbar, Alert } from '@mui/material';
import { MeetingRoom } from '@mui/icons-material';

export default function BookingForm({ serviceId, customerId, meetingMethod }) {
  const [dateTime, setDateTime] = React.useState(null);
  const [address, setAddress] = React.useState('');
  const [additionalInfo, setAdditionalInfo] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Tạo đối tượng CreateBookingDTO để gửi lên API
    const bookingData = {
      serviceId, // ID của dịch vụ, truyền từ props
      customerId, // ID khách hàng, truyền từ props
      address,
      additionalInfo,
      meetingMethod,
      dateTime: dateTime ? dateTime.toISOString() : null, // Convert date to ISO format
    };

    try {
      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      // Nếu tạo Booking thành công
      setSuccessMessage('Booking created successfully!');
      setDateTime(null); // Clear the form
      setAddress('');
      setAdditionalInfo('');
    } catch (error) {
      setErrorMessage('Error creating booking: ' + error.message);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          label="Select Date and Time"
          value={dateTime}
          onChange={(newValue) => setDateTime(newValue)}
          sx={{ width: '100%' }} // Full width for DateTimePicker
        />
      </DemoContainer>
      <Box sx={{ marginTop: '20px' }}>
        <TextField
          label="Enter Address"
          variant="outlined"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{ width: '100%' }} // Full width for Address field
        />
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <TextField
          label="Additional Information (optional)"
          variant="outlined"
          multiline // Allows for multiple lines of text
          rows={4} // Height of the field
          fullWidth
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          sx={{ width: '100%' }} // Full width for Additional Info field
        />
      </Box>
      <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ marginTop: '20px' }}>
        Submit
      </Button>

      {/* Hiển thị thông báo thành công */}
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Hiển thị thông báo lỗi */}
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
      >
        <Alert onClose={() => setErrorMessage('')} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
}
