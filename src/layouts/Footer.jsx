import CopyrightIcon from '@mui/icons-material/Copyright'
import { Box, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import { BG_COLOR, BLUE_COLOR } from '~/theme'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()
  return (
    <div>
      <Divider />
      <Box sx={{
        backgroundColor: BG_COLOR
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
              Koi Care Clinic provides expert veterinary care for koi and pond fish, ensuring their health and well-being with professional and compassionate attention.
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

            <Typography onClick={() => navigate('/home')} component={'a'} sx={{ lineHeight: '2', fontSize: '14px', cursor: 'pointer' }}>
              Koi Care
            </Typography>

            <Typography onClick={() => navigate('/')} sx={{ lineHeight: '2', fontSize: '14px', cursor: 'pointer' }}>
              Veterinary
            </Typography>

            <Typography onClick={() => navigate('/')} sx={{ lineHeight: '2', fontSize: '14px', cursor: 'pointer' }}>
              Vaccination
            </Typography>

            <Typography onClick={() => navigate('/')} sx={{ lineHeight: '2', fontSize: '14px', cursor: 'pointer' }}>
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

            <Typography onClick={() => navigate('/login')} sx={{ lineHeight: '2', fontSize: '14px', cursor: 'pointer' }}>
              Login
            </Typography>

            <Typography onClick={() => navigate('/register')} sx={{ lineHeight: '2', fontSize: '14px', cursor: 'pointer' }}>
              Register
            </Typography>

            <Typography onClick={() => navigate('/requestAppointment')} sx={{ lineHeight: '2', fontSize: '14px', cursor: 'pointer' }}>
              Request Appointment
            </Typography>
          </Box>

          {/* <Box sx={{
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
          </Box> */}
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
    </div >
  )
}

export default Footer
