import React from 'react'
import { Box, Typography } from '@mui/material'
import { BG_COLOR, BLUE_COLOR, GRAY_COLOR, ORANGE_COLOR } from '~/theme'
import { List, ListItem } from '@mui/material'

function ServiceNo2() {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <img src="https://www.mercurynews.com/wp-content/uploads/2021/03/SJM-L-FISHVET-03XX-3.jpg?w=1860" style={{ objectFit: 'contain', width: '600px', borderRadius: '26px' }} />
        </Box>
        <Box sx={{ width: '600px', borderRadius: '26px', padding: '0px 50px 0px 50px' }}>
          <Typography
            sx={{
              fontFamily: 'SVN-Konga Pro',
              fontSize: '44px',
              color: BLUE_COLOR,
              display: 'flex',
              justifyContent: 'start'
            }}
          >
            Consult a <span style={{ color: ORANGE_COLOR, marginLeft: '8px' }}>Veterinarian</span>
          </Typography>

          <Box>
            <Typography sx={{ fontWeight: 400, fontSize: 16, lineHeight: 2, marginTop: '20px' }}>Koi Care Clinic is a unique facility that specializes in providing comprehensive care for koi fish.
              Our team of experienced professionals offers a wide range of services, including routine check-ups, disease diagnosis and treatment, pond maintenance, and water quality testing.</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              marginTop: '40px'
            }}
          >
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default ServiceNo2
