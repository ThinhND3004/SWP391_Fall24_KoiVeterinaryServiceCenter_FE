import { Box, Typography } from '@mui/material'
import React from 'react'
import { BLUE_COLOR, ORANGE_COLOR } from '~/theme'


function Introduction() {
  return (
    <div>
      <Typography sx={{ fontFamily: 'SVN-Konga Pro', fontSize: 250, textAlign: 'center', color: BLUE_COLOR }}>KOI HEALTH</Typography>
      <Typography sx={{ textAlign: 'center', fontSize: 30, marginTop: '10px', fontWeight: 700 }}>
        Quality <span style={{ color: ORANGE_COLOR }} >Koi Fish</span> Care
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ textAlign: 'center', fontSize: 14, marginTop: '10px', width: '900px' }}>
          Our specialized Koi Health Services are designed to support the wellbeing of your koi fish through expert care and preventive treatments. At Koi Care Clinic, we combine knowledge and experience to maintain your fish's health and vitality.
        </Typography>
      </Box>
    </div>
  )
}

export default Introduction
