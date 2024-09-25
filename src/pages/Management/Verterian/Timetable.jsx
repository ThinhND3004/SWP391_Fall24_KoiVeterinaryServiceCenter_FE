import { Typography, Box } from '@mui/material';
import SaveButton from './SaveButton';
import TableHeader from './TableHeader';
import Schedule from './Schedule';

function Timetable() {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <SaveButton></SaveButton>

            <Box sx={{ transition: '0.5s' }}>
                <Typography variant='h1'>Your Availability</Typography>
                <TableHeader></TableHeader>
                <Typography variant='p' sx={{fontStyle: 'italic', marginTop: 'calc(10px + 0.5vw) !important' }}>
                    Drag to Toggle;
                </Typography>

                <Schedule></Schedule>
            </Box>

        </Box>
    )
}

export default Timetable