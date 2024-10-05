import { Box, Container, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BLUE_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useNavigate } from 'react-router-dom'
import api from '~/config/axios'
import dayjs from 'dayjs'
import { Alert } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';




function RegisterPageDetails() {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [dateOfBirth, setDateOfBirth] = useState(dayjs());

  const [errRes, setErrRes] = useState('');

  const [alertTrigger, setAlertTrigger] = useState(false);

  useEffect(() => {
    if (dateOfBirth) {
      setDob(dateOfBirth.format("YYYY-MM-DD"));
    }
  }, [dateOfBirth])

  const [error, setError] = useState({})


  const handleValidation = () => {

    const newError = {};

    if (!firstName) newError.firstName = 'First name is required!';
    if (!lastName) newError.lastName = 'Last name is required!';
    if (!password) newError.password = 'Password is required!';
    if (!email) newError.email = 'Email is required!';
    if (!dob) newError.dob = 'Date of birth is required!';
    if (!address) newError.address = 'Address is required!';
    if (!phone) newError.phone = 'Phone number is required!';
    if (password != confirmPassword) newError.password = 'Password and Confirm Password must be same!'

    setError(newError);

    return Object.keys(newError).length === 0;
  }


  const handleClearInfo = () => {
    setFirstName('');
    setLastName('');
    setPassword('');
    setAddress('');
    setConfirmPassword('');
    setDateOfBirth(dayjs());
    setDob('');
    setEmail('');
    setPhone('');
  }



  const handleRegis = async (e) => {
    e.preventDefault(); 
    console.log("DOB: ", dob)
    try {
      if (handleValidation()) {
        const response = await api.post("/accounts", {
          email,
          password,
          firstName,
          lastName,
          dob,
          phone,
          address,
          role
        });

        const dataErr = response.data.err;

        if (dataErr != null) {
          setErrRes(dataErr);
        } else {
          setErrRes(null);
          setAlertTrigger(true);
          handleClearInfo();
        }
        setAlertTrigger(true)

        console.log("REGISTER RESULT: ", response);

      } else {
        console.log("Validation failed. Please check your inputs.");
      }
    } catch (error) {
      console.error("ERROR: ", error); 
    }
  };




  return (
    <div>

      {errRes
        &&
        <Alert variant="filled" severity="error">
          {errRes}
        </Alert>
      }

      {!errRes && alertTrigger
        &&
        <Alert
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" />,
        }}
      > 
        Register successfully!
      </Alert>
      }



      <Box sx={{ margin: 0, padding: 0 }}>
        <Typography sx={{ fontFamily: 'SVN-Konga Pro', fontSize: 50, textAlign: 'left', color: BLUE_COLOR }}>
          Registration
        </Typography>
        <Typography sx={{ fontSize: 14, textAlign: 'left', color: BLUE_COLOR }}>
          Enter your details below to create your account and get started
        </Typography>
        <Box>

          <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 16 }}>First name</Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your first name'
                variant="outlined"
                type='text'
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value) }}
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
                    backgroundColor: INPUT_FIELD_COLOR,
                    padding: '20px 15px',
                    fontSize: '16px',
                    borderRadius: '15px'
                  }
                }}
              /> <br/>
              {error.firstName && <span style={{ color: 'red' }}>{error.firstName}</span>}
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Last name</Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your last name'
                variant="outlined"
                type='text'
                value={lastName}
                onChange={(e) => { setLastName(e.target.value) }}
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
                    backgroundColor: INPUT_FIELD_COLOR,
                    padding: '20px 15px',
                    fontSize: '16px',
                    borderRadius: '15px'
                  }
                }}
              />
              <br/>
              {error.lastName && <span style={{ color: 'red' }}>{error.lastName}</span>}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Email</Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your email'
                variant="outlined"
                type='email'
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
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
                    backgroundColor: INPUT_FIELD_COLOR,
                    padding: '20px 15px',
                    fontSize: '16px',
                    borderRadius: '15px'
                  }
                }}
              />
              <br/>
              {error.email && <span style={{ color: 'red' }}>{error.email}</span>}
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Date of Birth</Typography>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer 
                  components={['DatePicker']} 
                  variant='outlined'
                  
                  sx={{
                    overflow: 'hidden',
                    width: '600px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '15px',
                      borderColor: BLUE_COLOR,
                      height: '60px',
                      '&.Mui-focused fieldset': {
                        borderColor: BLUE_COLOR
                      }
                    },
                    '& input': {
                      backgroundColor: INPUT_FIELD_COLOR,
                      padding: '20px 15px',
                      fontSize: '16px',
                      borderRadius: '15px'
                    }
                  }}>
                  <DatePicker
                    placeholder="Select your date"
                    label=''
                    sx={{
                      backgroundColor: INPUT_FIELD_COLOR,
                      width: '600px',
                      borderRadius: '15px'
                    }} 
                    onChange={(value) => { setDob(value.target.value.$d) }}
                    />
                </DemoContainer>
              </LocalizationProvider> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                sx={{
                  marginTop: '15px',
                  backgroundColor: INPUT_FIELD_COLOR,
                  width: '600px',
                  borderRadius: '15px'
                }} 
                  value={dateOfBirth}
                  onChange={(newValue) => setDateOfBirth(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <br/>
              {error.dob && <span style={{ color: 'red' }}>{error.dob}</span>}
            </Box>
          </Box>


          <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Phone number</Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your phone number'
                variant="outlined"
                type='phoneNumber'
                value={phone}
                onChange={(e) => { setPhone(e.target.value) }}
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
                    backgroundColor: INPUT_FIELD_COLOR,
                    padding: '20px 15px',
                    fontSize: '16px',
                    borderRadius: '15px'
                  }
                }}
              />
              <br/>
              {error.phone && <span style={{ color: 'red' }}>{error.phone}</span>}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Address</Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your address'
                variant="outlined"
                type='text'
                value={address}
                onChange={(e) => { setAddress(e.target.value) }}
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
                    backgroundColor: INPUT_FIELD_COLOR,
                    padding: '20px 15px',
                    fontSize: '16px',
                    borderRadius: '15px'
                  }
                }}
              />
              <br/>
              {error.address && <span style={{ color: 'red' }}>{error.address}</span>}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Password</Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your password'
                variant="outlined"
                type='password'
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
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
                    backgroundColor: INPUT_FIELD_COLOR,
                    padding: '20px 15px',
                    fontSize: '16px',
                    borderRadius: '15px'
                  }
                }}
              />
              <br/>
              {error.password && <span style={{ color: 'red' }}>{error.password}</span>}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Confirm Password</Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your password'
                variant="outlined"
                type='password'
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value) }}
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
                    backgroundColor: INPUT_FIELD_COLOR,
                    padding: '20px 15px',
                    fontSize: '16px',
                    borderRadius: '15px'
                  }
                }}
              />
              <br/>
              {error.password && <span style={{ color: 'red' }}>{error.password}</span>}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                marginTop: '80px',
                marginBottom: '60px',
                borderRadius: '15px',
                border: `1px solid ${BLUE_COLOR}`
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '600px',
                  height: 'fit-content',
                  backgroundColor: '#fff',
                  borderRadius: '15px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Box
                  sx={{
                    height: '60px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: BLUE_COLOR,
                    fontFamily: 'Poppins',
                    textAlign: 'center',
                    fontWeight: 600
                  }}
                >
                  Cancel
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                marginTop: '80px',
                marginBottom: '60px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '600px',
                  height: 'fit-content',
                  backgroundColor: BLUE_COLOR,
                  borderRadius: '15px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Box
                  sx={{
                    height: '60px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontFamily: 'Poppins',
                    textAlign: 'center',
                    fontWeight: 500
                  }}
                  type='submit'
                  onClick={handleRegis}
                >
                  Create account
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', marginBottom: '40px' }}>
            <Typography sx={{ fontWeight: '500', fontSize: 16 }}>Already have an account?</Typography>

            <Typography onClick={() => navigate('/login')} component={'a'} sx={{
              color: ORANGE_COLOR,
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              p: 0,
              m: 0
            }}>
              Login
            </Typography>
          </Box>


        </Box>
      </Box>
    </div >
  )
}

export default RegisterPageDetails
