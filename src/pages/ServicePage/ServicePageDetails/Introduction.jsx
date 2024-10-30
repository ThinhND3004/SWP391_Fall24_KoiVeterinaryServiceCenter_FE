import { Box, Typography } from '@mui/material'
import React from 'react'
import { BLUE_COLOR, ORANGE_COLOR } from '~/theme'

function Introduction() {
  return (
    <div>
      <Typography sx={{ fontFamily: 'SVN-Konga Pro', fontSize: 120, textAlign: 'center', color: BLUE_COLOR }}>Our Medical Services</Typography>
      <Typography sx={{ textAlign: 'center', fontSize: 30, marginTop: '10px', fontWeight: 700 }}>
        Complete.   <span style={{ color: ORANGE_COLOR }} >Connected.</span>Compassionate
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ textAlign: 'center', fontSize: 14, marginTop: '10px', width: '900px' }}>
          At Koi Care Clinic, we are dedicated to providing compassionate and comprehensive medical services tailored to each patient’s unique needs. Our experienced team ensures quality care through personalized treatment plans and advanced medical technologies.
        </Typography>
      </Box>
    </div >
  )
}

export default Introduction
