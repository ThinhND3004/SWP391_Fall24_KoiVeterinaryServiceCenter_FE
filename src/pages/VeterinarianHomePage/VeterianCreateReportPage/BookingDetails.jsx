import { Box, Typography } from "@mui/material"
import { GRAY_COLOR } from "~/theme"

function BookingDetails({ booking }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, border: `1px solid ${GRAY_COLOR}`, padding: '20px', borderRadius: '14px' }}>
            {/* Display booking details */}
            <Typography variant="body1" sx={{ fontSize: '16px' }}><strong>Booking ID:</strong> {booking.id}</Typography>
            <Typography variant="body1" sx={{ fontSize: '16px' }}><strong>Customer:</strong> {booking.customerFullName}</Typography>
            <Typography variant="body1" sx={{ fontSize: '16px' }}><strong>Veterian:</strong> {booking.veterinarianFullName}</Typography>
            <Typography variant="body1" sx={{ fontSize: '16px' }}><strong>Service:</strong> {booking.serviceName}</Typography>
            <Typography variant="body1" sx={{ fontSize: '16px' }}><strong>Created At:</strong> {booking.createdAt}</Typography>
            <Typography variant="body1" sx={{ fontSize: '16px' }}><strong>Started At:</strong> {booking.startedAt}</Typography>

            <Typography variant="body1"><strong>Description:</strong> {booking.description}</Typography>
            <Typography variant="body1"><strong>User Address:</strong> {booking.userAddress}</Typography>
        </Box>
    )
}

export default BookingDetails