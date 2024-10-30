import React from 'react'
import { Box, Typography } from '@mui/material'
import { BG_COLOR, BLUE_COLOR, GRAY_COLOR, ORANGE_COLOR } from '~/theme'

function ServiceNo3() {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '100px' }}>
        <Box sx={{ width: '600px', borderRadius: '26px' }}>
          <Typography
            sx={{
              fontFamily: 'SVN-Konga Pro',
              fontSize: '44px',
              color: BLUE_COLOR,
              display: 'flex',
              justifyContent: 'start'
            }}
          >
            Why <span style={{ color: ORANGE_COLOR, marginLeft: '8px' }}> Koi Care Clinic?</span>
          </Typography>
          <Typography sx={{ fontWeight: 400, fontSize: 16, lineHeight: 2, marginTop: '20px' }}>Koi Care Clinic is a unique facility that specializes in providing comprehensive care for koi fish.<br /> Our team of experienced professionals offers a wide range of services, including routine check-ups, disease diagnosis and treatment, pond maintenance, and water quality testing.</Typography>
        </Box>
        <img src="https://th.bing.com/th/id/R.b6d974ea23070d1bd7e4ba172967b0e3?rik=2ETeGnVuOIX0rQ&pid=ImgRaw&r=0" style={{ objectFit: 'contain', width: '500px', borderRadius: '26px' }} />
      </Box>
    </div>
  )
}

export default ServiceNo3
