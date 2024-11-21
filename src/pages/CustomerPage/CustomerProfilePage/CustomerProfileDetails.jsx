import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { Avatar, Box, TextField, Typography } from '@mui/material'
import { BLUE_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import dayjs from 'dayjs'
import axios from 'axios'
import ManagementApi from '~/api/ManagementApi'
import { toast } from 'react-toastify'
import api from '~/config/axios'
import { set } from 'lodash'

function handleClick(event) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}


function Profile() {
  const [userInfo, setUserInfo] = useState({})
  const [avt, setAvt] = useState()
  const [nameHeader, setNameHeader] = useState({
    lastName: "",
    firstName: ""
  })

  const [accInfo, setAccInfo] = useState({})

  useEffect(() => {
    const getAccount = async () => {
      const res = await ManagementApi.getCurrentAccount()
      setAvt(await ManagementApi.getImage(res.imageId))
      if (res)
      {
        setAccInfo(res)
        setNameHeader((prev) => ({
          ...prev,
          lastName: res.lastName,
          firstName: res.firstName
        }))
      }
        
    };

    getAccount()

  }, []);




  const handleChangeInfo = (field, value) => {
    setAccInfo((previuos) => ({
      ...previuos,
      [field]: value
    }))
  }


  const handleSetImg = async (event) => {
    const file = event.target.files[0]

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);  // Ensure "file" matches @RequestParam("file") in the backend
        console.log("ACC ID SET AVT: ", accInfo)
        const response = await api.post(`/images/setAvt/${accInfo.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        toast.success(response.data.message)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err) {
        console.error('SET IMG ERR: ', err)
      }
    } 

  }

  const handleClickChangeImgBtn = () => {
    document.getElementById("file-input").click()
  }


  const handleClickSaveChange = async () => {
    // console.log("UPDATE DATA: ", userInfo)
    try {

      console.log("UPDATE ACC: ", {
        lastName: accInfo.lastName,
        firstName: accInfo.firstName,
        phone: accInfo.phone,
        dob: accInfo.dob,
        address: accInfo.address
      })
      const response = await api.put(`/accounts/${accInfo.id}`, {
        lastName: accInfo.lastName,
        firstName: accInfo.firstName,
        phone: accInfo.phone,
        dob: accInfo.dob,
        address: accInfo.address
      })

      console.log("UPDATE RESULT: ", response.data)
      if (response.data.status === 200)
      {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1500); 
      }
        
      else
        toast.error(response.data.message)

    } catch {
      console.error("ERROR UPDATE OCCUR!!!")
    }
  }

  // const handleGetUserInfo = () => {
  //   const accInfo = localStorage.getItem('accountInfo')
  //   // console.log('ACCOUNT: ', JSON.parse(accInfo))
  //   if (accInfo) {
  //     const info = JSON.parse(accInfo)

  //     const firstName = info.firstName
  //     const lastName = info.lastName
  //     const email = info.email
  //     const phone = info.phone
  //     const dob = info.dob
  //     const address = info.address


  //     setUserInfo({
  //       firstName,
  //       lastName,
  //       email,
  //       dob,
  //       address,
  //       phone
  //     })
  //   }
  // }

  // useEffect(() => {
  //   handleGetUserInfo()
  // }, [])

  return (
    <div style={{ position: 'relative' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
          {nameHeader.firstName} {nameHeader.lastName}
        </Typography>
        <Typography sx={{
          fontWeight: 600, fontSize: '20px'
        }}
        >
          Account
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <Avatar
          src={avt}
          style={{ width: '90px', height: '90px', borderRadius: '50%', marginRight: '20px' }}
        />
        <Box>
          <Box sx={{ display: 'flex', width: '400px', height: '30px', gap: 2 }}>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleSetImg}
            />
            <Button
              variant="contained"
              sx={{
                boxShadow: 'none',
                fontSize: '16px',
                bgcolor: '#D6EAE8',
                borderRadius: '10px',
                height: '40px',
              }}
              onClick={() => handleClickChangeImgBtn()}
            >
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
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Email</Typography>
          <Typography
            sx={{
              width: '500px',
              borderRadius: '15px',
              height: '60px',
              marginTop: '15px',
              padding: '20px 0px',
              fontSize: '16px'
            }}
          >
            {accInfo ? accInfo.email : 'Loading...'}
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Role</Typography>
          <Typography
            sx={{
              width: '500px',
              borderRadius: '15px',
              height: '60px',
              marginTop: '15px',
              padding: '20px 0px',
              fontSize: '16px',
            }}
          >
            {accInfo ? accInfo.role : 'Loading...'}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-around', gap: 10 }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>First name</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your first name'
            value={accInfo ? accInfo.firstName : 'Loading...'}
            onChange={(e) => handleChangeInfo('firstName', e.target.value)}
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
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Last name</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your last name'
            value={accInfo ? accInfo.lastName : 'Loading...'}
            onChange={(e) => handleChangeInfo('lastName', e.target.value)}
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
          ></TextField>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-around', gap: 10 }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Phone number</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your phone number'
            value={accInfo ? accInfo.phone : 'Loading...'}
            onChange={(e) => handleChangeInfo('phone', e.target.value)}
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
                value={accInfo ? dayjs(accInfo.dob) : null}
                onChange={(date) => handleChangeInfo('dob', dayjs(date).format('YYYY-MM-DD'))}
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

      <Box sx={{ mt: 5, mb: '80px' }}>
        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Address</Typography>
        <TextField
          id="outlined-basic"
          placeholder='Enter your address'
          value={accInfo ? accInfo.address : 'Loading...'}
          onChange={(e) => handleChangeInfo('address', e.target.value)}
          variant="outlined"
          type='text'
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
      {/* <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 10 }}>
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
      </Box> */}


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
            onClick={() => handleClickSaveChange()}
          >
            Save changes
          </Button>
        </Box>
      </Box>
    </div>
  )
}

export default Profile
