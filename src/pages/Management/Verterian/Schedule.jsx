import { Typography, Box, Grid } from '@mui/material';
import React from 'react';

const dayArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeArr = ['9', '10', '11', '12', '13', '14', '15', '16', '17'];
const text = 'rgb(22, 21, 21)';

function TableTime() {
    return (
        <Box sx={{ marginTop: '20px', textAlign: 'right' }}>
            {timeArr.map((time, index) => (
                <Typography key={index} sx={{ fontSize: 'smaller', lineHeight: '28px' }}>
                    {`${time}:00`}
                </Typography>
            ))}
        </Box>
    );
}

function TableDay() {
    return (
        <Box sx={{ display: 'inline-grid', gridTemplateColumns: 'repeat(7, 1fr)', width: '100%' }}>
            {dayArr.map((day, index) => (
                <Typography key={index} sx={{ fontSize: 'large', fontWeight: '500', marginBottom: '0' }}>
                    {day}
                </Typography>
            ))}
        </Box>
    )
}

function TimeBlock({ dayIndex, time }) {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                width: '100%',
                height: 'calc(20px + 0.22vw)',
                borderLeft: '1px solid rgb(22, 21, 21)',
                borderRight: '1px solid rgb(22, 21, 21)',
                transition: '0.1s',
                gridColumn: dayIndex + 1
            }}
            title={`${dayArr[dayIndex]} ${time}`} // Using title instead of label
        ></Box>
    )
}

function TableGrid() {
    return (
        <Box
            sx={{
                display: 'inline-grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gridAutoRows: 'minmax(50px, auto)',
                width: '100%',
                gridAutoFlow: 'column',
                borderTop: '1px solid rgb(22, 21, 21)',
                transition: '0.5s'
            }}
        >
            {dayArr.map((day, dayIndex) => (
                <React.Fragment key={dayIndex}>
                    {timeArr.map((time, timeIndex) => (
                        <React.Fragment key={timeIndex}>
                            <TimeBlock dayIndex={dayIndex} time={`${timeArr[timeIndex]}:00`} />
                            <TimeBlock dayIndex={dayIndex} time={`${timeArr[timeIndex]}:30`} />
                        </React.Fragment>
                    ))}
                </React.Fragment>
            ))}
        </Box>
    );
}


function Schedule() {
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 5fr', columnGap: '10px', width: '40%', margin: 'auto' }}>
            <TableTime></TableTime>
            <Box>
                <TableDay></TableDay>
                <TableGrid></TableGrid>
            </Box>
        </Box>
    )
}

export default Schedule;