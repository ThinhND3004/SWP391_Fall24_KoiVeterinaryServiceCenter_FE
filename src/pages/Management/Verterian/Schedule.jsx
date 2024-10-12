import { Typography, Box } from '@mui/material';
import React from 'react';
import TableGrid from './TableGrid';

const dayArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeArr = ['9', '10', '11', '12', '13', '14', '15', '16', '17'];
const text = 'rgb(22, 21, 21)';

function TableTime() {
    return (
        <Box sx={{ marginTop: '20px', textAlign: 'right' }}>
            {timeArr.map((time, index) => (
                <Typography key={index} 
                sx={{ 
                    fontSize: 'smaller',
                    lineHeight: '29.5px',
                    marginBottom: 'calc(10px + 0.5vw)'
                }}>
                    {`${time}:00`}
                </Typography>
            ))}
        </Box>
    );
}

function TableDay() {
    return (
        <Box sx={{ display: 'inline-grid', gridTemplateColumns: `repeat(${dayArr.length}, 1fr)`, width: '100%' }}>
            {dayArr.map((day, index) => (
                <Typography key={index} sx={{ fontSize: 'large', fontWeight: '500', marginBottom: '0' }}>
                    {day.slice(0,3)}
                </Typography>
            ))}
        </Box>
    )
}

function Schedule() {
    return (
        <Box 
        sx={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 7fr',
            columnGap: '10px',
            width: '40%',
            margin: 'auto'
        }}
        >
            <TableTime></TableTime>
            <Box>
                <TableDay></TableDay>
                <TableGrid></TableGrid>
            </Box>
        </Box>
    )
}

export default Schedule;