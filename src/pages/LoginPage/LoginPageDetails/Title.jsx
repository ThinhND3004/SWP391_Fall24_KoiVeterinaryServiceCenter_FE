import { Box, TextField, Typography } from '@mui/material'
import React from 'react'
import { BLUE_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'


function Title() {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px', marginTop: '50px' }}>
          <img src='https://i.etsystatic.com/16221531/r/il/283513/3896651157/il_570xN.3896651157_7xfk.jpg' style={{ objectFit: 'contain', width: '600px', borderRadius: '26px' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontFamily: 'SVN-Konga Pro', fontSize: 48, textAlign: 'center', color: BLUE_COLOR }}>
              Welcome to <span style={{ color: ORANGE_COLOR }} >Koi Care Clinic</span>
            </Typography>
            <Typography sx={{ textAlign: 'center', fontSize: 14, marginTop: '10px' }}>
              Complete. Connected. Compassionate. At Tia, we care for the whole you with a team of<br /> providers working together to help you achieve optimal health, on your terms.
            </Typography>

            {/* Login using google */}
            <Box sx={{ marginTop: '50px' }}>
              <Button variant="contained" sx={{
                borderRadius: '15px',
                bgcolor: INPUT_FIELD_COLOR,
                height: '60px',
                width: '600px',
                fontWeight: 600,
                fontSize: 20,
                boxShadow: 'none',
                gap: 2
              }}>
                <img src='src\assets\images\LoginGoogle.png' style={{ width: '30px' }} />
                Continue with Google
              </Button>
            </Box>

            {/* Divider */}
            <Box sx={{ marginTop: '50px' }}>
              <Divider>
                <Typography>or</Typography>
              </Divider>
            </Box>

            {/* Login using email + pwd */}
            <Box sx={{ display: 'flex', marginTop: '0px', justifyContent: 'space-between', flexDirection: 'column' }}>
              <Box sx={{ paddingTop: '50px' }}>
                <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
                  Email
                  <span style={{ color: ORANGE_COLOR }} >  *</span>
                </Typography>
                <TextField
                  id="outlined-basic"
                  placeholder='Enter your email'
                  variant="outlined"
                  sx={{
                    width: '600px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '15px',
                      borderColor: BLUE_COLOR,
                      height: '60px',
                      marginTop: '15px',
                      '&.Mui-focused fieldset': {
                        borderColor: BLUE_COLOR
                      }
                    },
                    '& input': {
                      padding: '10px 15px',
                      fontSize: '16px'
                    }
                  }}
                />
              </Box>
              <Box sx={{ paddingTop: '30px' }}>
                <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
                  Password
                  <span style={{ color: ORANGE_COLOR }} >  *</span>
                </Typography>
                <TextField
                  id="outlined-basic"
                  placeholder='Enter your password'
                  variant="outlined"
                  sx={{
                    width: '600px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '15px',
                      borderColor: BLUE_COLOR,
                      height: '60px',
                      marginTop: '15px',
                      '&.Mui-focused fieldset': {
                        borderColor: BLUE_COLOR
                      }
                    },
                    '& input': {
                      padding: '10px 15px',
                      fontSize: '16px'
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Login submit */}
            <Box sx={{ marginTop: '50px' }}>
              <Button variant="contained" sx={{
                borderRadius: '15px',
                bgcolor: BLUE_COLOR,
                height: '60px',
                width: '600px',
                // fontWeight: 600,
                fontSize: 20,
                boxShadow: 'none',
                gap: 2,
                color: '#fff'
              }}>
                Login
              </Button>
            </Box>

            {/* Don't have account? */}
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', marginTop: '20px' }}>
              <Typography sx={{ fontWeight: '500' }}>Don't have an account?</Typography>

              <Button onClick={() => navigate('/register')} sx={{
                color: ORANGE_COLOR,
                fontWeight: 600,
                p: 0,
                m: 0
              }}>
                Sign up for free
              </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', marginTop: '20px' }}>
              <Typography sx={{ fontSize: '14px' }}>By signing up, you argee to our </Typography>
              <Typography sx={{ fontWeight: '500', fontSize: '14px' }}>Terms of services & Privacy policy</Typography>
            </Box>

          </Box>
        </Box>
      </Box >
    </div>
  )
}

export default Title
