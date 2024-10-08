import React, { useState } from 'react'
import Navbar from '../AdminPageDetails/Navbar'
import { Box, Breadcrumbs, Typography, Tabs, Tab, TextField, FormGroup, FormControlLabel, Checkbox, Button, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import PropTypes from 'prop-types'
import { BG_COLOR, BLUE_COLOR, GRAY_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme'
import { Table } from 'react-bootstrap'
import Paper from '@mui/material/Paper'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import SearchIcon from '@mui/icons-material/Search'


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function BookingPageDetails() {
  const [valueTab, setValueTab] = useState(0)
  const [todoDatas, setTodoDatas] = useState([])
  const [fieldData, setFieldData] = useState('')
  const [id, setId] = useState(0)

  const handleChange = (event, newValue) => {
    setValueTab(newValue)
  }

  function createData(name, dob, fullName, startDate, email, phoneNumber, status) {
    return { name, dob, fullName, startDate, email, phoneNumber, status }
  }

  const rows = [
    createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
    createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
    createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
    createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
    createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
    createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
    createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
    createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend'),
    createData('Hedwig F. Nguyen', '01/01/2000', 'Arcu Vel Foundation', '03/27/2017', 'nunc.ullamcorper@metusvitae.com', '070 8206 9605', 'Suspend')
  ]

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

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
              Nguyen Van A
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
              Bookings Management
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      {/* search box */}
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
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

        <Button variant="contained" sx={{ boxShadow: 'none', bgcolor: INPUT_FIELD_COLOR, borderRadius: '10px', gap: 1 }}>
          <FilterListIcon sx={{ color: GRAY_COLOR, fontSize: '14px' }} />
          <Typography sx={{ color: GRAY_COLOR, fontWeight: 500, fontSize: '14px' }}>
            Filter
          </Typography>
        </Button>

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


      {/* tab bar */}
      <Box>
        <Box sx={{ width: '100%', mt: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={valueTab} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth" centered>
              <Tab
                label="Pending"
                {...a11yProps(0)}
                sx={{
                  color: BLUE_COLOR,
                  fontWeight: 700,
                  '&.Mui-selected': {
                    color: ORANGE_COLOR
                  }
                }}
              />
              <Tab label="In progress" {...a11yProps(1)} sx={{
                color: BLUE_COLOR,
                fontWeight: 700,
                '&.Mui-selected': {
                  color: ORANGE_COLOR
                }
              }} />
              <Tab label="Complete" {...a11yProps(2)} sx={{
                color: BLUE_COLOR,
                fontWeight: 700,
                '&.Mui-selected': {
                  color: ORANGE_COLOR
                }
              }} />
            </Tabs>
          </Box>

          <CustomTabPanel value={valueTab} index={0}>
            {/* Table */}
            <Box sx={{ mt: 3, mb: 3 }}>
              <TableContainer component={Paper} sx={{ maxHeight: 460, overflowY: 'auto' }}>
                <Table sx={{ minWidth: 500 }} aria-label="customer table">
                  <TableHead sx={{ bgcolor: BG_COLOR }}>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: 600 }} >Name</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Date of Birth</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Fullname</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Start Date</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Email</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Phone number</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ bgcolor: BG_COLOR }}>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" >{row.name}</TableCell>
                        <TableCell align="center">{row.dob}</TableCell>
                        <TableCell align="center">{row.fullName}</TableCell>
                        <TableCell align="center">{row.startDate}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.phoneNumber}</TableCell>
                        {/* <TableCell align="center" sx={{ bgcolor: '#E2A03F', borderRadius: '4px', color: '#fff' }}>{row.status}</TableCell> */}
                        <TableCell align="center" sx={{ borderRadius: '4px', color: ORANGE_COLOR, fontWeight: 500 }}>{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </CustomTabPanel>

          <CustomTabPanel value={valueTab} index={1}>
            <Box sx={{ mt: 3, mb: 3 }}>
              <TableContainer component={Paper} sx={{ maxHeight: 460, overflowY: 'auto' }}>
                <Table sx={{ minWidth: 500 }} aria-label="customer table">
                  <TableHead sx={{ bgcolor: BG_COLOR }}>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: 600 }} >Name</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Date of Birth</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Fullname</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Start Date</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Email</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Phone number</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ bgcolor: BG_COLOR }}>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" >{row.name}</TableCell>
                        <TableCell align="center">{row.dob}</TableCell>
                        <TableCell align="center">{row.fullName}</TableCell>
                        <TableCell align="center">{row.startDate}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.phoneNumber}</TableCell>
                        <TableCell align="center" sx={{ borderRadius: '4px', color: ORANGE_COLOR, fontWeight: 500 }}>{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </CustomTabPanel>

          <CustomTabPanel value={valueTab} index={2}>
            <Box sx={{ mt: 3, mb: 3 }}>
              <TableContainer component={Paper} sx={{ maxHeight: 460, overflowY: 'auto' }}>
                <Table sx={{ minWidth: 500 }} aria-label="customer table">
                  <TableHead sx={{ bgcolor: BG_COLOR }}>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: 600 }} >Name</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Date of Birth</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Fullname</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Start Date</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Email</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Phone number</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ bgcolor: BG_COLOR }}>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" >{row.name}</TableCell>
                        <TableCell align="center">{row.dob}</TableCell>
                        <TableCell align="center">{row.fullName}</TableCell>
                        <TableCell align="center">{row.startDate}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.phoneNumber}</TableCell>
                        {/* <TableCell align="center" sx={{ bgcolor: '#E2A03F', borderRadius: '4px', color: '#fff' }}>{row.status}</TableCell> */}
                        <TableCell align="center" sx={{ borderRadius: '4px', color: ORANGE_COLOR, fontWeight: 500 }}>{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </CustomTabPanel>
        </Box>
      </Box>
    </div >
  )
}
