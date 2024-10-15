import { Box, Typography } from '@mui/material'
import React from 'react'
import { BLACK_COLOR, BLUE_COLOR, DARK_GREEN, LIGHT_PINK, ORANGE_COLOR } from '~/theme'

function LegendItem({ label, color }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
      <Typography sx={{ display: 'inline-block' }}>
        {label}
      </Typography>
      <Box
        sx={{
          backgroundColor: color,
          border: '1px solid rgb(22, 21, 21)',
          height: 'calc(18px + 0.4vw)',
          width: 'calc(28px + 0.5vw)',
          display: 'inline-block',
          marginLeft: '5px'
        }}
      ></Box>
    </Box>
  );
}

function TableHeader() {
  return (
    <Box sx={{ display: 'inline-flex', marginTop: '10px' }}>
      <LegendItem label="Unavailable" color={ORANGE_COLOR} />
      <LegendItem label="Available" color={BLUE_COLOR} />
    </Box>
  )
}

export default TableHeader
