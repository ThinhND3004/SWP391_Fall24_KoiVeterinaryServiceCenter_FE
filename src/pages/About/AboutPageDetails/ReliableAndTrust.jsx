import { Box, Typography } from '@mui/material'
import React from 'react'
import { BLUE_COLOR, ORANGE_COLOR } from '~/theme'

function ReliableAndTrust() {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ width: '600px', borderRadius: '26px' }}>
          <Typography
            sx={{
              fontFamily: 'SVN-Konga Pro',
              fontSize: '48px',
              color: BLUE_COLOR,
              justifyContent: 'start'
            }}
          >
            Trusted<span style={{ color: ORANGE_COLOR, marginLeft: '8px' }}>Caretakers</span>
          </Typography>

          <Typography sx={{ fontWeight: 400, fontSize: 16, lineHeight: 2 }}>
            Koi Care Clinic is a unique facility that specializes in providing comprehensive care for koi fish.
            <br />
            Our team of experienced professionals offers a wide range of services, including routine check-ups, disease diagnosis and treatment, pond maintenance, and water quality testing.
            <br />
            We are dedicated to helping koi enthusiasts maintain the health and well-being of their beloved fish.
          </Typography>
        </Box>
        <Box
          component="img"
          src="https://i.pinimg.com/originals/0f/09/7d/0f097d536f05aad276df69c2e1b9b255.jpg"
          alt="Koi Fish Image"
          sx={{
            objectFit: 'contain',
            width: '600px',
            borderRadius: '26px'
          }}
        />
      </Box>
    </div>
  )
}

export default ReliableAndTrust
