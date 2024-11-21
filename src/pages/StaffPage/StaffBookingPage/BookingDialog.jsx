import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from '@mui/material';
import { useState } from "react";
import { BLUE_COLOR, INPUT_FIELD_COLOR } from '~/theme';
import TimeUtils from '~/utils/TimeUtils';


export default function BookingDialog({ booking }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleClickOpen}
        sx={{
          borderRadius: '14px',
          bgcolor: BLUE_COLOR,
          color: '#fff',
          boxShadow: 'none'
        }}>
        View Details
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="booking-dialog-title" PaperProps={{
        sx: {
          bgcolor: INPUT_FIELD_COLOR,
          borderRadius: '20px',
          padding: 2,
          minHeight: '50vh', // Adjust height as needed
          minWidth: '50vw', // Adjust width as needed
        }
      }}>
        <DialogTitle sx={{
          marginTop: 4,
          mb: 2,
          bgcolor: INPUT_FIELD_COLOR
        }}>
          <Typography sx={{ fontFamily: 'SVN-Konga Pro', color: BLUE_COLOR, fontSize: 30 }}>
            Booking Information
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ bgcolor: INPUT_FIELD_COLOR }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Display booking details */}
            <Typography variant="body1"><strong>Booking ID:</strong> {booking.id}</Typography>
            <Typography variant="body1"><strong>Customer:</strong> {booking.customerFullName}</Typography>
            <Typography variant="body1"><strong>Veterian:</strong> {booking.veterinarianFullName}</Typography>
            <Typography variant="body1"><strong>Service:</strong> {booking.serviceName}</Typography>

            <Typography variant="body1"><strong>Additional Information:</strong> {booking.additionalInformation}</Typography>
            <Typography variant="body1"><strong>Total Price:</strong> {booking.totalPrice}</Typography>
            <Typography variant="body1"><strong>Distance (m):</strong> {booking.distance_meters}</Typography>
            <Typography variant="body1"><strong>User Address:</strong> {booking.userAddress}</Typography>
            <Typography variant="body1"><strong>Status:</strong> {booking.statusEnum}</Typography>

            <Typography><strong>Created At:</strong> {TimeUtils.formatDateTime(booking.createdAt)}</Typography>
            <Typography><strong>Started At:</strong> {TimeUtils.formatDateTime(booking.startedAt)}</Typography>
            <Typography><strong>Ended At:</strong> {booking.endedAt ? TimeUtils.formatDateTime(booking.endedAt) : null}</Typography>
          </Box>

        </DialogContent>



        <DialogActions>
          <Button onClick={handleClose} sx={{ bgcolor: BLUE_COLOR, borderRadius: '30px', width: '120px', height: '40px' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog >
    </Box >


  )
}