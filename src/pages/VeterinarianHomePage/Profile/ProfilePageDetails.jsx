import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { Avatar, Box, TextField, Typography } from '@mui/material'
import { BLUE_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Timetable from '~/pages/Management/Verterian/Timetable'
import ManagementApi from '~/api/ManagementApi'
import dayjs from 'dayjs'
import VerterianProfile from './VeterianProfile'
import api from '~/config/axios'
import { set, update } from 'lodash'
import { toast } from 'react-toastify'

function ProfilePageDetails() {
  const [avt, setAvt] = useState();
  const [account, setAccount] = useState({});
  const [nameHeader, setNameHeader] = useState({
    lastName: "",
    firstName: ""
  })

  const fillUpdateAcc = (field, value) => {
    setAccount((prev) => ({
      ...prev,
      [field]: value
    }));
  }



  useEffect(() => {
    const fetchAccount = async () => {
      const accountData = await ManagementApi.getCurrentAccount();
      setAvt(await ManagementApi.getImage(accountData.imageId))
      setAccount(accountData)
      setNameHeader({
        lastName: accountData.lastName,
        firstName: accountData.firstName
      })
    }


    fetchAccount();

    console.log("ACCOUNT: ", account)
  }, []);


  const handleSetImg = async (event) => {
    const file = event.target.files[0]

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);  // Ensure "file" matches @RequestParam("file") in the backend
        console.log("ACC ID SET AVT: ", account)
        const response = await api.post(`/images/setAvt/${account.id}`, formData, {
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



  const handleUpdateVetAcc = async () => {
    try {
      
      // const updatedAccount = { ...account, disable: false };
      

      const response = await api.put(`accounts/${account.id}`, { 
        firstName: account.firstName,
        lastName: account.lastName,
        dob: account.dob,
        phone: account.phone,
        address: account.address
      });
      if (response.data.status === 200)
        {
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 1500); 
        }
          
        else
          toast.error(response.data.message)
    } catch (err) {
      console.log("UPDATE ERR: ", err);
    }

  }

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
            {account ? account.email : 'Loading...'}
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
            {account ? account.role : 'Loading...'}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-around', gap: 10 }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>First name</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your first name'
            value={account ? account.firstName : 'Loading...'}
            onChange={(e) => fillUpdateAcc('firstName', e.target.value)}
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
            value={account ? account.lastName : 'Loading...'}
            onChange={(e) => fillUpdateAcc('lastName', e.target.value)}
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
            value={account ? account.phone : 'Loading...'}
            onChange={(e) => fillUpdateAcc('phone', e.target.value)}
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
                value={account ? dayjs(account.dob) : null}
                onChange={(date) => fillUpdateAcc('dob', dayjs(date).format('YYYY-MM-DD'))}
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
          value={account ? account.address : 'Loading...'}
          onChange={(e) => fillUpdateAcc('address', e.target.value)}
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

      {/* Submit button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          marginBottom: '60px'
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
            onClick={() => handleUpdateVetAcc()}
          >
            Save changes
          </Button>
        </Box>

      </Box>
      {/* VETERIAN PROFILE */}
      <VerterianProfile />
      {/* When2meet */}
      <Box sx={{ mb: 10 }}>
        <Timetable />
      </Box>
    </div >
  )
}

export default ProfilePageDetails
