import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from '@mui/material';
import { useState } from "react";
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
      <Button variant="contained" color="primary" onClick={handleClickOpen}
        sx={{
          margin: '5px 0px',
          borderRadius: '10px'
        }}>
        View Details
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="booking-dialog-title">
        <DialogTitle sx={{
          marginBottom: '5px',
        }}>
          Booking Information
        </DialogTitle>

        <DialogContent >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Display booking details */}
            <Typography variant="body1"><strong>Booking ID:</strong> {booking.id}</Typography>
            <Typography variant="body1"><strong>Customer:</strong> {booking.customerFullName}</Typography>
            <Typography variant="body1"><strong>Veterian:</strong> {booking.veterinarianFullName}</Typography>
            <Typography variant="body1"><strong>Service:</strong> {booking.serviceName}</Typography>

            <Typography variant="body1"><strong>Description:</strong> {booking.description}</Typography>
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
          <Button onClick={handleClose} sx={{ color: 'red' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog >
    </Box >


  )
}