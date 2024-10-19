import { Typography, Box } from '@mui/material';
import TableHeader from './TableHeader';
import Schedule from './Schedule';
import SaveButton from './SaveButton';

function Timetable() {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ transition: '0.5s', display: 'block' }}>
                <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                    Your Availability
                </Typography>
                <TableHeader />
                <Schedule />
                <SaveButton />
            </Box>

        </Box >
    )
}

export default Timetable