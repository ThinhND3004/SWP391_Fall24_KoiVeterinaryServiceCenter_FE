import { Typography, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableGrid from './TableGrid'
import ManagementApi from '~/api/ManagementApi'

const dayArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeArr = ['9', '10', '11', '12', '13', '14', '15', '16', '17'];
const timeBlockArr = [];

dayArr.forEach((day) => {
  timeArr.slice(0, timeArr.length - 1).forEach((time) => {
    timeBlockArr.push(`${day.toUpperCase()} ${time}:00`); // Push hour time blocks
    timeBlockArr.push(`${day.toUpperCase()} ${time}:30`); // Push half-hour time blocks
  });
});

function turn_string_to_date(day_string) {
  let [hours, minute] = day_string.split(":").map(Number);
  let time = new Date();
  time.setHours(hours, minute, 0, 0);
  return time;
}

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
  )
}

function TableDay() {
  return (
    <Box sx={{ display: 'inline-grid', gridTemplateColumns: `repeat(${dayArr.length}, 1fr)`, width: '100%' }}>
      {dayArr.map((day, index) => (
        <Typography key={index} sx={{ fontSize: 'large', fontWeight: '500', marginBottom: '0' }}>
          {day.slice(0, 3)}
        </Typography>
      ))}
    </Box>
  )
}


function Schedule() {
  const [selectedTimeBlocks, setSelectedTimeBlocks] = useState([]);

  const fetchTimetables = async () => {
    const data = await ManagementApi.getTimetables();
    if (data) {
      const selectedBlocks = [];

      data.forEach((timetable) => {
        const timetableDay = timetable.dayOfWeek;
        const timetableStartTime = turn_string_to_date(timetable.startTime);
        const timetableEndTime = turn_string_to_date(timetable.endTime);
        // console.log("Timetable start time", timetableStartTime)

        timeBlockArr.forEach((timeBlock) => {
          const day = timeBlock.split(" ")[0];
          const startTime = turn_string_to_date(timeBlock.split(" ")[1]);

          if (
            timetableDay === day && 
            timetableStartTime.getTime() <= startTime.getTime() &&
            timetableEndTime.getTime() > startTime.getTime())
            {
              selectedBlocks.push(timeBlock);
              
            }
        })
      })
      setSelectedTimeBlocks(selectedBlocks);
    }
  }

  useEffect(() => {
    fetchTimetables();

  },[]);

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
      <TableTime />
      <Box>
        <TableDay />
        <TableGrid selectedTimeBlocks={selectedTimeBlocks} timeBlockArr={timeBlockArr} timeArr={timeArr} />
      </Box>
    </Box>
  )
}

export default Schedule