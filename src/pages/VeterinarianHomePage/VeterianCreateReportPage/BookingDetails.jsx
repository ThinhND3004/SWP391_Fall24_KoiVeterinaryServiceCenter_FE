import { Box, Typography } from "@mui/material"

function BookingDetails({ booking }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid black', padding: '10px', borderRadius: '14px' }}>
            {/* Display booking details */}
            <Typography variant="body1"><strong>Booking ID:</strong> {booking.id}</Typography>

            <Box>
                <Typography variant="body1"><strong>Customer:</strong> {booking.customerFullName}</Typography>
                <Typography variant="body1"><strong>Veterian:</strong> {booking.veterinarianFullName}</Typography>
                <Typography variant="body1"><strong>Service:</strong> {booking.serviceName}</Typography>
                <Typography variant="body1"><strong>Created At:</strong> {booking.createdAt}</Typography>
                <Typography variant="body1"><strong>Started At:</strong> {booking.startedAt}</Typography>
            </Box>

            <Typography variant="body1"><strong>Description:</strong> {booking.description}</Typography>
            <Typography variant="body1"><strong>User Address:</strong> {booking.userAddress}</Typography>


        </Box>
    )
}

export default BookingDetails