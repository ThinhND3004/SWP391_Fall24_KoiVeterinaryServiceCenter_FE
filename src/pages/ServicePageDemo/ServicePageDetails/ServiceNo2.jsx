import React from 'react'
import { Box, Typography } from '@mui/material'
import { BG_COLOR, BLUE_COLOR, GRAY_COLOR, OFFLINE_CENTER_BUTTON, ONLINE_BUTTON, ORANGE_COLOR } from '~/theme'
import { Button } from 'react-bootstrap'
import CallMadeIcon from '@mui/icons-material/CallMade';

function ServiceNo2() {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <img src="src\assets\images\multiColor.avif" style={{ objectFit: 'contain', width: '500px', borderRadius: '26px' }} />
        </Box>
        <Box sx={{ width: '600px', borderRadius: '26px', padding: '0px 50px 0px 50px' }}>
          <Typography
            sx={{
              fontFamily: 'SVN-Konga Pro',
              fontSize: '45px',
              color: BLUE_COLOR,
              display: 'flex',
              justifyContent: 'start'
            }}
          >
            Koi Treatment
          </Typography>

          <Box>
            <Typography sx={{ fontWeight: 400, fontSize: 16, lineHeight: 2, marginTop: '20px' }}>Koi Care Clinic is a unique facility that specializes in providing comprehensive care for koi fish.
              Our team of experienced professionals offers a wide range of services, including routine check-ups, disease diagnosis and treatment, pond maintenance, and water quality testing.</Typography>
              <Box padding={'20px 0px'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} width={600} height={50}>
            <Box padding={'10px 0px'} display={'flex'} justifyContent={'space-between'} width={360}>
              <Typography 
                sx={{
                  textAlign: 'center',
                  backgroundColor: OFFLINE_CENTER_BUTTON,
                  color: 'white',
                  width: 170,
                  borderRadius: '10px',
                  height: '30px' 
                }}
              >Offline home</Typography>
              <Typography
                sx={{
                  textAlign: 'center',
                  backgroundColor: OFFLINE_CENTER_BUTTON,
                  color: 'white',
                  width: 170,
                  borderRadius: '10px',
                  height: '30px'  
                }}
              >Offline center</Typography>
            </Box>
            <Button
              style={{
                height: '50px',
                width: '150px',
                borderRadius: '30px',
                backgroundColor: BLUE_COLOR,
                color: 'white',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center', // Centers content horizontally
                alignItems: 'center',   
                justifyContent: 'space-between',
                padding: '0px 9px'  // Smooth background color transition
              }}
            >Learn more
            <CallMadeIcon/>
            </Button>
          </Box>
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
