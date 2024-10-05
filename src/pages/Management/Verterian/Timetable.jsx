import { Typography, Box } from '@mui/material';
import TableHeader from './TableHeader';
import Schedule from './Schedule';
import { ORANGE_COLOR } from '~/theme';
import SaveButton from './SaveButton';

function Timetable() {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ transition: '0.5s', display: 'block' }}>
                <Typography variant='h2' 
                sx={{
                    fontFamily: 'SVN-Konga Pro',
                    color: ORANGE_COLOR
                    }}>
                        Your Availability
                </Typography>
                <TableHeader></TableHeader>
                <Schedule></Schedule>
                <SaveButton></SaveButton>
            </Box>

        </Box>
    )
}

export default Timetable