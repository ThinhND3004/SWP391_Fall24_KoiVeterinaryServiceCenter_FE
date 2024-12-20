import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from '@mui/material';
import { useState } from "react";
import { BLUE_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme';
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
          borderRadius: '10px',
          boxShadow: 'none',
          border: `1px solid ${BLUE_COLOR}`
        }}>
        View Details
      </Button>

      <Box>
        <Dialog open={open} onClose={handleClose} aria-labelledby="booking-dialog-title" PaperProps={{
          sx: {
            bgcolor: INPUT_FIELD_COLOR,
            borderRadius: '20px',
            padding: 2
          }
        }}>
          <DialogTitle sx={{
            marginBottom: '5px',
            mt: 2
          }}>
            <Typography sx={{ fontWeight: 500, fontSize: 30, fontFamily: 'SVN-Konga Pro', color: BLUE_COLOR }}>
              Booking Information
            </Typography>
          </DialogTitle>

          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Display booking details */}
              <Typography><strong>Booking ID:</strong> {booking.id}</Typography>
              <Typography><strong>Customer:</strong> {booking.customerFullName}</Typography>
              <Typography><strong>Veterian:</strong> {booking.veterinarianFullName}</Typography>
              <Typography><strong>Service:</strong> {booking.serviceName}</Typography>

              <Typography><strong>Additional Information:</strong> {booking.additionalInformation}</Typography>
              <Typography><strong>Total Price:</strong> {booking.totalPrice} VND </Typography>
              {booking.meetingMethod !== "ONLINE" && (
                <Typography><strong>Distance (m):</strong> {booking.distance_meters} km</Typography>
              )}

              {booking.meetingMethod !== "ONLINE" && (
                <Typography><strong>User Address:</strong> {booking.userAddress}</Typography>
              )}

              <Typography><strong>Status:</strong> {booking.statusEnum}</Typography>

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
      </Box>
    </Box >


  )
}