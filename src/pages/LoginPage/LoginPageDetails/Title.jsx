import { Box, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { BLUE_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useNavigate } from 'react-router-dom'
import api from '~/config/axios'

function Title() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const isLoginned = localStorage.getItem('token') != null;
    if (isLoginned)
      navigate('/home');
  }, [])

  const handleLogin = async () => {
    console.log(email);
    console.log(password);

    try {
      const response = await api.post("/auth/login-password", {
        email,
        password,
      });
      console.log(response.data.data.token)
      const { token } = response.data.data.token;
      localStorage.setItem("token", JSON.stringify(response.data.data.token));
      navigate("/home");
    } catch (err) {
      console.log(err);
      alert(err.response.data.data.token);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleLogin();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [email, password]);

  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px', marginTop: '10px' }}>
          <img src='https://i.etsystatic.com/16221531/r/il/283513/3896651157/il_570xN.3896651157_7xfk.jpg' style={{ objectFit: 'contain', width: '500px', borderRadius: '26px' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: '40px' }}>
            <Typography sx={{ fontFamily: 'SVN-Konga Pro', fontSize: 45, textAlign: 'center', color: BLUE_COLOR }}>
              Welcome to <span style={{ color: ORANGE_COLOR }}>Koi Care Clinic</span>
            </Typography>
            <Typography sx={{ textAlign: 'center', fontSize: 14, marginTop: '10px' }}>
              Complete. Connected. Compassionate. At Tia, we care for the whole you with a team of<br /> providers working together to help you achieve optimal health, on your terms.
            </Typography>

            {/* Login using Google */}
            <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" sx={{
                borderRadius: '15px',
                bgcolor: INPUT_FIELD_COLOR,
                height: '60px',
                width: '560px',
                fontWeight: 600,
                fontSize: 16,
                boxShadow: 'none',
                gap: 2
              }}>
                <img src='src\assets\images\LoginGoogle.png' style={{ width: '20px' }} />
                Continue with Google
              </Button>
            </Box>

            {/* Divider */}
            <Box sx={{ marginTop: '20px' }}>
              <Divider>
                <Typography sx={{ fontSize: 14 }}>or</Typography>
              </Divider>
            </Box>

            {/* Login using email + pwd */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Box sx={{ paddingTop: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                  Email
                  <span style={{ color: ORANGE_COLOR }}> *</span>
                </Typography>
                <TextField
                  id="outlined-basic"
                  placeholder='Enter your email'
                  variant="outlined"
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    width: '560px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '15px',
                      borderColor: BLUE_COLOR,
                      height: '60px',
                      marginTop: '10px',
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
                <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                  Password
                  <span style={{ color: ORANGE_COLOR }}> *</span>
                </Typography>
                <TextField
                  id="outlined-basic"
                  placeholder='Enter your password'
                  variant="outlined"
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    width: '560px',
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
            <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" sx={{
                borderRadius: '15px',
                bgcolor: BLUE_COLOR,
                height: '60px',
                width: '560px',
                fontSize: 16,
                boxShadow: 'none',
                gap: 2,
                color: '#fff'
              }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Box>

            {/* Don't have account? */}
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', marginTop: '20px' }}>
              <Typography sx={{ fontWeight: '500', fontSize: 16 }}>Don't have an account?</Typography>

              <Typography onClick={() => navigate('/register')} component={'a'} sx={{
                color: ORANGE_COLOR,
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                p: 0,
                m: 0
              }}>
                Sign up for free
              </Typography>
            </Box>

          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Title;
