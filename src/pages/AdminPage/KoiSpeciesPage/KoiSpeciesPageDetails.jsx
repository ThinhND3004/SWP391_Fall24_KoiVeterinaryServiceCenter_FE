import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  styled, alpha, Box, Breadcrumbs, Typography, Button, Modal,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Dialog, DialogTitle, List, ListItem,
  ListItemAvatar, ListItemButton, ListItemText, Avatar, InputBase,
  TextField
} from '@mui/material'

import {
  Search as SearchIcon, FilterList as FilterListIcon, Add as AddIcon,
  FileDownload as FileDownloadIcon, Person as PersonIcon
} from '@mui/icons-material'
import { blue } from '@mui/material/colors'
import {
  BG_COLOR, BLUE_COLOR, GRAY_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR
} from '~/theme'
import DynamicDataGrid from './testGrid'
import useFetchOnce from '~/hooks/useFetchOnce'
import api from '~/config/axios'
import BackdropComponent from '~/components/Backdrop.component'


// Search Component Styles
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

// Data generation function
function createData(name, dob, fullName, startDate, email, phoneNumber, status) {
  return { name, dob, fullName, startDate, email, phoneNumber, status }
}

// Sample data
const rows = [
  createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspended'),
  createData('Genevieve U. Watts', '01/01/2000', 'Eget Incorporated', '07/18/2017', 'Nullam.vitae@egestas.edu', '0800 025698', 'Closed'),
  createData('Kyra S. Baldwin', '01/01/2000', 'Lorem Vitae Limited', '04/14/2016', 'in@elita.org', '0800 237 8846', 'Suspended'),
  createData('Stephen V. Hill', '01/01/2000', 'Eget Mollis Institute', '03/03/2016', 'eu@vel.com', '0800 682 4591', 'Active'),
  createData('Vielka Q. Chapman', '01/01/2000', 'Eu Ltd', '06/25/2017', 'orci.Donec.nibh@mauriseratget.edu', '0800 181 5795', 'Suspended'),
  createData('Ocean W. Curtis', '01/01/2000', 'Eu Ltd', '08/24/2017', 'cursus.et@cursus.edu', '(016977) 9585', 'Active'),
  createData('Kato F. Tucker', '01/01/2000', 'Vel Lectus Limited', '11/06/2017', 'Duis@Lorem.edu', '070 0981 8503', 'Active'),
  createData('Robin J. Wise', '01/01/2000', 'Curabitur Dictum PC', '02/09/2017', 'blandit@montesnascetur.edu', '0800 259158', 'Active'),
  createData('Uriel H. Guerrero', '01/01/2000', 'Mauris Inc.', '02/11/2018', 'vitae@linnecorci.net', '0500 948772', 'Active'),
  createData('Yasir W. Benson', '01/01/2000', 'At Incorporated', '01/13/2017', 'ornare.elit.elit@atortor.edu', '0391 916 3600', 'Active')
]

const emails = ['username@gmail.com', 'user02@gmail.com']

// SimpleDialog Component
function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }

  return (
    <Dialog onClose={handleClose} open={open}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: BG_COLOR, // Background color
          padding: 3, // Padding inside the dialog
          borderRadius: '15px', // Rounded corners
          width: '500px' // Fixed width
          // height: '550px'
        }
      }}>
      <DialogTitle>
        <Typography sx={{ color: BLUE_COLOR, fontSize: 20, fontWeight: 700, textAlign: 'center' }}>
          Prescription Details
        </Typography>
      </DialogTitle>

      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Full name</Typography>
        <TextField
          id="outlined-basic"
          placeholder='Enter your full name'
          variant="outlined"
          sx={{
            width: '500px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              borderColor: BLUE_COLOR,
              height: '40px',
              marginTop: '15px',
              '&.Mui-focused fieldset': {
                borderColor: BLUE_COLOR
              }
            },
            '& input': {
              // backgroundColor: INPUT_FIELD_COLOR,
              // padding: '20px 15px',
              fontSize: '16px',
              borderRadius: '15px'
            }
          }}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Service</Typography>
        <TextField
          id="outlined-basic"
          placeholder='Enter your service name'
          variant="outlined"
          sx={{
            width: '500px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              borderColor: BLUE_COLOR,
              height: '40px',
              marginTop: '15px',
              '&.Mui-focused fieldset': {
                borderColor: BLUE_COLOR
              }
            },
            '& input': {
              // backgroundColor: INPUT_FIELD_COLOR,
              // padding: '20px 15px',
              fontSize: '16px',
              borderRadius: '15px'
            }
          }}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Prescription</Typography>
        <TextField
          id="outlined-basic"
          placeholder='Enter your prescription'
          variant="outlined"
          sx={{
            width: '500px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              borderColor: BLUE_COLOR,
              height: '70px',
              marginTop: '15px',
              '&.Mui-focused fieldset': {
                borderColor: BLUE_COLOR
              }
            },
            '& input': {
              // backgroundColor: INPUT_FIELD_COLOR,
              // padding: '20px 15px',
              fontSize: '16px',
              borderRadius: '15px'
            }
          }}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Shipping Method</Typography>
        <TextField
          id="outlined-basic"
          placeholder='Enter your shipping'
          variant="outlined"
          sx={{
            width: '500px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              borderColor: BLUE_COLOR,
              height: '40px',
              marginTop: '15px',
              '&.Mui-focused fieldset': {
                borderColor: BLUE_COLOR
              }
            },
            '& input': {
              // backgroundColor: INPUT_FIELD_COLOR,
              padding: '20px 15px',
              fontSize: '16px',
              borderRadius: '15px'
            }
          }}
        />
      </Box>

      <Typography sx={{ mt: 2, color: ORANGE_COLOR, fontWeight: 600 }}>
        Total price: 1.000.000 VNĐ
      </Typography>

      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'start',
          marginBottom: '20px'
        }}
      >
        <Button
          sx={{
            width: '150px',
            height: '50px',
            backgroundColor: BLUE_COLOR,
            borderRadius: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={handleClose}
        >
          <Typography sx={{ color: '#fff' }}>Closed</Typography>
        </Button>
      </Box>
    </Dialog >
  )
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
}

// Main PrescriptionPageDetails Component
function PrescriptionPageDetails() {
  // const [open, setOpen] = useState(false)
  // const [selectedValue, setSelectedValue] = useState(emails[0])

  // const handleClickOpen = () => {
  //   setOpen(true)
  // }

  // const handleClose = (value) => {
  //   setOpen(false)
  //   setSelectedValue(value)
  // }

  const [serviceDatas, setServiceDatas] = useState([])
  const { data, loading, error } = useFetchOnce('koi-species')

  useEffect(() => {
    if (!data) return
    const fetchData = []
    const services = data.map(dt => {
      const {
        id,
        name,
        description,
        createdAt
      } = dt

      return {
        id,
        name,
        description,
        createdAt
      }
    })
    setServiceDatas(services)
  }, [data])


  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Search sx={{
            borderRadius: '10px',
            bgcolor: INPUT_FIELD_COLOR
          }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: GRAY_COLOR, fontSize: '14px' }} />
            </SearchIconWrapper>
            <StyledInputBase sx={{ fontSize: '14px' }}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          {/* <Button variant="contained" sx={{ boxShadow: 'none', bgcolor: INPUT_FIELD_COLOR, borderRadius: '10px', gap: 1 }}>
            <FilterListIcon sx={{ color: GRAY_COLOR, fontSize: '14px' }} />
            <Typography sx={{ color: GRAY_COLOR, fontWeight: 500, fontSize: '14px' }}>
              Filter
            </Typography>
          </Button> */}

          <Button variant="contained" sx={{ boxShadow: 'none', bgcolor: INPUT_FIELD_COLOR, borderRadius: '10px', gap: 1 }}>
            <FileDownloadIcon sx={{ color: GRAY_COLOR, fontSize: '14px' }} />
            <Typography sx={{ color: GRAY_COLOR, fontWeight: 500, fontSize: '14px' }}>
              Import
            </Typography>
          </Button>

          <Button variant="contained" sx={{ boxShadow: 'none', bgcolor: BLUE_COLOR, borderRadius: '10px', color: '#fff', gap: 1 }}>
            <AddIcon sx={{ fontSize: '14px' }} />
            <Typography sx={{ fontSize: '14px' }}>
              Add
            </Typography>
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <Box sx={{ mt: 3, mb: 3 }}>
        <DynamicDataGrid data={serviceDatas} />
      </Box>
      <BackdropComponent open={loading} />
    </Box>
  )
}

export default PrescriptionPageDetails
