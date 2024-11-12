import { Alert, Box, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { BLUE_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useNavigate } from 'react-router-dom'
import api from '~/config/axios'
import ErrorIcon from '@mui/icons-material/Error'
import { toast } from 'react-toastify'
import ManagementApi from '~/api/ManagementApi'

function Title() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginMess, setLoginMess] = useState('')


  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await ManagementApi.getCurrentAccount();

        const navUrl =
          userData.role === "ADMIN" ? "/bookings_dashboard" :
            userData.role === "MANAGER" ? "/bookings_dashboard" :
              "/veterinarian";

        if (userData.role === "CUSTOMER") {
          navigate('/403');
          return;
        }

        const isLoginned = localStorage.getItem('token') != null;
        if (isLoginned) {
          navigate(navUrl);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, [navigate]); // Added `navigate` as a dependency


  const handleLogin = async () => {
    setLoginMess('')
    if (!email || !password) {
      setLoginMess('Email and Password are required')
      return
    }

    try {
      const response = await api.post('/auth/login-password', {
        email,
        password
      })

      const { data, status, message, err } = response.data;
      if (status === 200) {
        localStorage.setItem('token', data.token)
        const loginRes = await ManagementApi.getCurrentAccount();


        const navUrl =
          loginRes.role === "ADMIN" ? "/bookings_dashboard" :
            loginRes.role === "MANAGER" ? "/bookings_dashboard" :
              loginRes.role === "STAFF" ? "/staff" :
                loginRes.role === "CUSTOMER" ? "/login" : "/veterinarian";

        // navigate('/home')
        if (navUrl === "/login") {
          localStorage.removeItem('token');
          toast.error("Your account cannot login here!!")
        } else toast.success(message)

        setTimeout(() => {
          window.location.href = navUrl;
        }, 1500);
      } else {
        setLoginMess(err[0])
        toast.error(err[0] || response?.error?.message)
      }
    } catch (err) {
      const errorMessage = 'Login failed. Please try again.'
      setLoginMess(errorMessage)
      toast.error(errorMessage)
    }
  }


  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'} >
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px', marginTop: '10px' }}>
          {/* <img src='src\assets\images\management.png' style={{ objectFit: 'contain', width: '400px', borderRadius: '26px' }} /> */}
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: '0px', width: 600 }}>
            <Typography sx={{ fontFamily: 'SVN-Konga Pro', fontSize: 40, textAlign: 'center', color: BLUE_COLOR }}>
              Welcome To Koi Care Clinic <span style={{ color: ORANGE_COLOR }}>Management System</span>
            </Typography>
            <Typography sx={{ textAlign: 'center', fontSize: 12, marginTop: '10px' }}>
              Welcome to the Admin Portal. Please log in with your credentials to access and manage the system’s resources.
            </Typography>

            {/* Login using Google */}
            {/* <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained" sx={{
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
            </Box> */}

            {/* Divider */}
            {/* <Box sx={{ marginTop: '20px' }}>
              <Divider>
                <Typography sx={{ fontSize: 14 }}>or</Typography>
              </Divider>
            </Box> */}

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
                    width: '500px',
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
                    width: '500px',
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
                width: '500px',
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
            {/* <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', marginTop: '20px' }}>
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
            </Box> */}

          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Title
