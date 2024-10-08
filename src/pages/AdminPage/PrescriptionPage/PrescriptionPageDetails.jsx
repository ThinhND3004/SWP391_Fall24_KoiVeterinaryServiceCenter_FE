import React, { useState } from 'react'
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
  createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
  createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
  createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
  createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
  createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
  createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
  createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
  createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
  createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
  createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
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
              borderRadius: '15px',
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
              borderRadius: '15px',
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
              borderRadius: '15px',
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
              borderRadius: '15px',
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
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(emails[0])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value) => {
    setOpen(false)
    setSelectedValue(value)
  }

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>Nguyen Van A</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>Prescriptions Management</Typography>
          </Breadcrumbs>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Search sx={{ borderRadius: '10px', bgcolor: INPUT_FIELD_COLOR }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: GRAY_COLOR, fontSize: '14px' }} />
            </SearchIconWrapper>
            <StyledInputBase sx={{ fontSize: '14px' }} placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>

          <Button variant="contained" sx={{ boxShadow: 'none', bgcolor: INPUT_FIELD_COLOR, borderRadius: '10px', gap: 1 }}>
            <FilterListIcon sx={{ color: GRAY_COLOR, fontSize: '14px' }} />
            <Typography sx={{ color: GRAY_COLOR, fontWeight: 500, fontSize: '14px' }}>Filter</Typography>
          </Button>

          <Button variant="contained" sx={{ boxShadow: 'none', bgcolor: INPUT_FIELD_COLOR, borderRadius: '10px', gap: 1 }}>
            <FileDownloadIcon sx={{ color: GRAY_COLOR, fontSize: '14px' }} />
            <Typography sx={{ color: GRAY_COLOR, fontWeight: 500, fontSize: '14px' }}>Import</Typography>
          </Button>

          <Button variant="contained" sx={{ boxShadow: 'none', bgcolor: BLUE_COLOR, borderRadius: '10px', color: '#fff', gap: 1 }}>
            <AddIcon sx={{ fontSize: '14px' }} />
            <Typography sx={{ fontSize: '14px' }}>Add</Typography>
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: 3, mb: 3 }}>
        <TableContainer component={Paper} sx={{ maxHeight: 500, overflowY: 'auto' }}>
          <Table sx={{ minWidth: 650 }} aria-label="customer table">
            <TableHead sx={{ bgcolor: BG_COLOR }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Booking ID</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Customer Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Phone number</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Address</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Created At</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>View Prescription</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ bgcolor: BG_COLOR }}>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="center">{row.dob}</TableCell>
                  <TableCell align="center">{row.fullName}</TableCell>
                  <TableCell align="center">{row.startDate}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.phoneNumber}</TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" onClick={handleClickOpen} sx={{ bgcolor: ORANGE_COLOR, borderRadius: '10px' }}>
                      Active
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  )
}

export default PrescriptionPageDetails
