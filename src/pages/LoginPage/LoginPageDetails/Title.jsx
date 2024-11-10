import { Alert, Box, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { BLUE_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useNavigate } from 'react-router-dom'
import api from '~/config/axios'
import ErrorIcon from '@mui/icons-material/Error'
import { toast } from 'react-toastify'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import ManagementApi from '~/api/ManagementApi'

function Title() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginMess, setLoginMess] = useState('')


  const setTokenWithExpiry = (token) => {
    localStorage.setItem('token', token)
  }

  const handleNavigate = () => {
    navigate('/home');
    window.location.reload();  // Force reload
};

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Log the token response to inspect available fields
        console.log("Token Response: ", tokenResponse);
        setLoginMess('')
        // Use `access_token` to call the backend API
        const response = await api.get(`/auth/login-google?credential=${tokenResponse.access_token}`);
        console.log(response.data); // Handle the response from backend
        setTokenWithExpiry(response.data.data.token);
        const { data, status, message, err } = response.data


      if (status === 200) {
        localStorage.setItem('token', data.token)
        setTokenWithExpiry(data.token)
        navigate('/home')
        // window.location.href = "/home";
        

        toast.success(message)
      } else {
        setLoginMess(err[0])
        toast.error(err[0] || response?.error?.message)
      }
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    onError: (error) => console.error("Google Login Failed:", error),
  });
  


  useEffect(() => {
    const isLoginned = localStorage.getItem('token') != null
    if (isLoginned)
      navigate('/home')
  }, [])

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

      // console.log('LOGIN ERROR: ', response.data.data.err)

      // if (response?.data?.data?.err) {
      //   setLoginMess(response.data.data.err)
      // } else if (response?.data?.data?.token) {
      //   // localStorage.setItem("token", response.data.data.token);
      //   setTokenWithExpiry(response.data.data.token)
      //   window.location.href = '/home'

      // } else {
      //   setLoginMess('Unexpected error occurred.')
      // }

      const { data, status, message, err } = response.data


      if (status === 200) {
        localStorage.setItem('token', data.token)
        
        const loginRes = await ManagementApi.getCurrentAccount();
        console.log("LOGIN RES: ", loginRes.role)


        const navUrl =
        loginRes.role === "CUSTOMER" ? "/home" : "/login/admin"

        
        if (loginRes.role !== "CUSTOMER")
          {
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


  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleLogin()
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [email, password])

  return (


    <div>
      {/* 
      {loginMess && (
        <Alert
          severity='error'
          iconMapping={{
            error: <ErrorIcon fontSize="inherit" />
          }}
        >
          {loginMess}
        </Alert>
      )} */}


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
              <Button
                onClick={() => login()}
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

export default Title
