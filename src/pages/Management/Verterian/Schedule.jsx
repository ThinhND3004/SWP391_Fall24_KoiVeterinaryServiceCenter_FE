import { Typography, Box } from '@mui/material';
import React from 'react';
import { LIGHT_PINK } from '~/theme';
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

// function TimeBlock({ dayIndex, time, borderBottom }) {
//     return (
//         <Box
//         className={'time-block'}
//             sx={{
//                 backgroundColor: LIGHT_PINK, 
//                 width: '100%',
//                 height: 'calc(20px + 0.22vw)',
//                 borderLeft: `1px solid ${text}`,
//                 borderRight: `1px solid ${text}`,
//                 transition: '0.1s',
//                 borderBottom: `1px ${borderBottom} ${text}` 
//             }}
//             title={`${dayArr[dayIndex]} ${time}`} 
//         ></Box>
//     );
// }

// function TableGrid() {
//     return (
//         <Box
//             sx={{
//                 display: 'inline-grid',
//                 gridTemplateColumns: `repeat(${dayArr.length}, 1fr)`,
//                 width: '100%',
//                 borderTop: `1px solid ${text}`,
//                 transition: '0.5s'
//             }}
//         >
//             {timeArr.slice(0,timeArr.length-1).map((time, timeIndex) => (
//                 <React.Fragment key={timeIndex}>
//                     {dayArr.map((day, dayIndex) => (
//                         <React.Fragment key={dayIndex}>
//                             <TimeBlock dayIndex={dayIndex} time={`${timeArr[timeIndex]}:00`} borderBottom={'dashed'} />
//                         </React.Fragment>
//                     ))}
//                      {dayArr.map((day, dayIndex) => (
//                         <React.Fragment key={dayIndex}>
//                             <TimeBlock dayIndex={dayIndex} time={`${timeArr[timeIndex]}:30`} borderBottom={'solid'} />
//                         </React.Fragment>
//                     ))}
//                 </React.Fragment>
//             ))}
//         </Box>
//     );
// }


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