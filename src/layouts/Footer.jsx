import CopyrightIcon from '@mui/icons-material/Copyright'
import { Box, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import { BG_COLOR, BLUE_COLOR } from '~/theme'

function Footer() {
  return (
    <div>
      <Divider />
      <Box sx={{
        backgroundColor: BG_COLOR,
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'row',
          color: BLUE_COLOR,
          py: '40px'
        }}>

          <Box sx={{
            maxWidth: '300px'
          }}>
            <Typography sx={{
              textTransform: 'uppercase',
              fontWeight: '700',
              fontSize: '16px'
            }}>
              Koi Care Clinic
            </Typography>

            <Typography sx={{ lineHeight: '2', fontSize: '14px' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, laudantium harum! Nam aperiam assumenda molestiae nobis aliquid sequi maxime
            </Typography>

          </Box>

          <Box sx={{
          }}>
            <Typography sx={{
              fontWeight: '700',
              fontSize: '16px'
            }}>
              Services
            </Typography>

            <Typography sx={{ lineHeight: '2', fontSize: '14px' }}>
              Koi Care
            </Typography>

            <Typography sx={{ lineHeight: '2', fontSize: '14px' }}>
              Veterinary
            </Typography>

            <Typography sx={{ lineHeight: '2', fontSize: '14px' }}>
              Vaccination
            </Typography>

            <Typography sx={{ lineHeight: '2', fontSize: '14px' }}>
              Cleaning
            </Typography>
          </Box>

          <Box sx={{
          }}>
            <Typography sx={{
              fontWeight: '700',
              fontSize: '16px'
            }}>
              Community
            </Typography>

            <Typography sx={{ lineHeight: '2', fontSize: '14px' }}>
              My Account
            </Typography>

            <Typography sx={{ lineHeight: '2', fontSize: '14px' }}>
              Login/ Register
            </Typography>

            <Typography sx={{ lineHeight: '2', fontSize: '14px' }}>
              Request Appointment
            </Typography>
          </Box>

          <Box sx={{
          }}>
            <Typography sx={{
              fontWeight: '700',
              fontSize: '16px'
            }}>
              Platform
            </Typography>

            <Typography sx={{ lineHeight: '2', fontSize: '14px' }}>
              Privacy Policy
            </Typography>

            <Typography sx={{ lineHeight: '2', fontSize: '14px' }}>
              Terms Of Use
            </Typography>

            <Typography sx={{ lineHeight: '2', fontSize: '14px' }}>
              FAQ
            </Typography>

            <Typography sx={{ lineHeight: '2', fontSize: '14px' }}>
              Contact
            </Typography>
          </Box>
        </Box >

        <Divider />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: BLUE_COLOR
        }}>
          <Divider style={{
            borderWidth: '1px',
            opacity: '100%',
            color: BLUE_COLOR
          }} />

          <CopyrightIcon fontSize="sx" />
          <Typography sx={{
            fontWeight: '300',
            fontSize: '12px',
            padding: '20px 3px',
            color: BLUE_COLOR
          }}>
            Copyright Rimel 2022. All right reserved
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

export default Footer
