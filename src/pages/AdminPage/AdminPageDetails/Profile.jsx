import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { Box, TextField, Typography } from '@mui/material'
import { BLUE_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import dayjs from 'dayjs';
import api from '~/config/axios'
import axios, { Axios } from 'axios'

function handleClick(event) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}


function Profile() {
  const [userInfo, setUserInfo] = useState({});

  const handleChangeInfo = (field, value) => {
    setUserInfo(previuos => ({
      ...previuos,
      [field]: value
    }))
  }

  // useEffect(() => {
  //   if (userInfo.dob) {
  //     setDob(pre => ({
  //       ...pre,
  //       [dob]: dob.format("YYYY-MM-DD")
  //     }));
  //   }
  // }, [])


  const handleClickSaveChange = async () => {
    const accInfo = JSON.parse(localStorage.getItem('accountInfo'))
    console.log("UPDATE DATA: ", userInfo);
    try {
      // const response = await api.put(`accounts/${accInfo.id}`, {
      //   firstName: userInfo.firstName,
      //   lastName: userInfo.lastName,
      //   dob: userInfo.dob,
      //   phone: userInfo.phone,
      //   address: userInfo.add
      // });

      const response = await axios.put(`http://localhost:8080/accounts/${accInfo.id}`, userInfo);

      console.log("UPDATE RESULT: ", response.data);
    } catch {
      console.log("ERROR UPDATE OCCUR!!!");
    }
  }

  const handleGetUserInfo = () => {
    const accInfo = localStorage.getItem('accountInfo');
    console.log('ACCOUNT: ', JSON.parse(accInfo))
    if (accInfo) {
      const info = JSON.parse(accInfo);

      const firstName = info.firstName;
      const lastName = info.lastName;
      const email = info.email;
      const phone = info.phone;
      const dob = info.dob;
      const address = info.address;


      setUserInfo({
        firstName,
        lastName,
        email,
        dob,
        address,
        phone
      })
    }
  }

  useEffect(() => {
    handleGetUserInfo();
  }, [])

  return (
    <div style={{ left: '250px', position: 'relative' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
          {userInfo.firstName} {userInfo.lastName}
        </Typography>
        <Typography sx={{
          fontWeight: 600, fontSize: '20px'
        }}
        >
          Account
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <img
          src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/462711740_18005468618659508_2399165263118220467_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGgpYmZozIN8KHUTZoNLzjGU-vZdd6xRrVT69l13rFGtantx4zkHnpDZHBJOis87DDVjUIpZvcdv5zvbhPL48IS&_nc_ohc=uqKFgbi2lTEQ7kNvgEQtt6i&_nc_ht=scontent.fsgn5-6.fna&_nc_gid=ABnDpDsis1fk5uA5uWyXpqV&oh=00_AYDLmxD5gdEYkVp0AOoNzOs0kQZ41mHFTEBBGrLbFeJKvQ&oe=670F28A5"
          style={{ width: '90px', height: '90px', borderRadius: '50%', marginRight: '20px' }}
        />
        <Box>
          <Box sx={{ display: 'flex', width: '400px', height: '30px', gap: 2 }}>
            <Button variant="contained" sx={{ boxShadow: 'none', fontSize: '16px', bgcolor: INPUT_FIELD_COLOR, borderRadius: '10px', height: '40px' }}>
              Upload new picture
            </Button>

            <Button variant="contained" sx={{ boxShadow: 'none', color: ORANGE_COLOR, fontSize: '16px', bgcolor: INPUT_FIELD_COLOR, borderRadius: '10px', height: '40px' }}>
              Delete picture
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Input */}
      <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-around', gap: 10 }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Profile name</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your first name'
            variant="outlined"
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
                backgroundColor: INPUT_FIELD_COLOR,
                padding: '20px 15px',
                fontSize: '16px',
                borderRadius: '15px'
              }
            }}
          />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Email</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your first name'
            variant="outlined"
            value={userInfo.email}
            disabled
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
                backgroundColor: INPUT_FIELD_COLOR,
                padding: '20px 15px',
                fontSize: '16px',
                borderRadius: '15px'
              }
            }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-around', gap: 10 }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>First name</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your first name'
            variant="outlined"
            value={userInfo.firstName}
            onChange={(e) => { handleChangeInfo('firstName', e.target.value) }}
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
                backgroundColor: INPUT_FIELD_COLOR,
                padding: '20px 15px',
                fontSize: '16px',
                borderRadius: '15px'
              }
            }}
          />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Last name</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your last name'
            variant="outlined"
            value={userInfo.lastName}
            onChange={(e) => { handleChangeInfo('lastName', e.target.value) }}
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
                backgroundColor: INPUT_FIELD_COLOR,
                padding: '20px 15px',
                fontSize: '16px',
                borderRadius: '15px'
              }
            }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-around', gap: 10 }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Phone number</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your phone number'
            variant="outlined"
            value={userInfo.phone}
            onChange={(e) => { handleChangeInfo('phone', e.target.value) }}
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
                backgroundColor: INPUT_FIELD_COLOR,
                padding: '20px 15px',
                fontSize: '16px',
                borderRadius: '15px'
              }
            }}
          />
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Date of Birth</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={['DatePicker']}
              variant='outlined'

              sx={{
                overflow: 'hidden',
                width: '500px',
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
                value={dayjs(userInfo.dob)}
                onChange={(e) => { handleChangeInfo('dob', e.target.value) }}
                sx={{
                  backgroundColor: INPUT_FIELD_COLOR,
                  width: '600px',
                  borderRadius: '15px'
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Box>

      <Box sx={{ mt: 5, mb: '40px' }}>
        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Address</Typography>
        <TextField
          id="outlined-basic"
          placeholder='Enter your address'
          variant="outlined"
          type='text'
          onChange={(e) => { handleChangeInfo('add', e.target.value) }}
          value={userInfo.address}
          sx={{
            width: '1090px',
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
      </Box>

      {/* update password */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 10 }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Enter your old password</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your old password'
            variant="outlined"
            sx={{
              width: '1100px',
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
        </Box>
      </Box>

      <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-around', gap: 10 }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Enter your new password</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your new password'
            variant="outlined"
            sx={{
              width: '1100px',
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
        </Box>
      </Box>


      {/* Submit button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          marginBottom: '60px',
          marginTop: '40px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '200px',
            height: 'fit-content',
            backgroundColor: BLUE_COLOR,
            borderRadius: '40px',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Button

            sx={{
              width: 'calc(250px - 45px)',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontFamily: 'Poppins'
            }}
            onClick={handleClickSaveChange}
          >
            Save changes
          </Button>
        </Box>
      </Box>
    </div>
  )
}

export default Profile