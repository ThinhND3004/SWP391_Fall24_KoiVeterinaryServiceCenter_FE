import { styled, alpha } from '@mui/material/styles'
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Typography, InputBase, TextField, Menu, MenuItem
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import React, { useEffect, useState } from 'react'
import DynamicDataGrid from './testGrid'
import { BG_COLOR, BLUE_COLOR, GRAY_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme'
import api from '~/config/axios'
import BackdropComponent from '~/components/Backdrop.component'
import useFetchOnce from '~/hooks/useFetchOnce'

// Styled Components
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

const StyledTextField = styled(TextField)(({ theme }) => ({
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
}))

const BookingPageDetails = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [serviceDatas, setServiceDatas] = useState([])
  const { data, loading, error } = useFetchOnce('services/getAllService')
  const isMenuOpen = Boolean(anchorEl)

  const handleDialogOpen = () => setOpenDialog(true)
  const handleDialogClose = () => setOpenDialog(false)

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (!data) return

    const fetchData = []
    const services = data.map(dt => {
      const {
        name,
        type,
        description,
        meetingMethod,
        price,
        travelPricePerMeter,
        estimatedTime,
        createdAt
      } = dt

      return {
        name,
        type,
        description,
        meetingMethod,
        price,
        travelPricePerMeter,
        estimatedTime,
        createdAt
      }
    })

    setServiceDatas(services)
  }, [data])


  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Search sx={{ borderRadius: '10px', bgcolor: INPUT_FIELD_COLOR }}>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: GRAY_COLOR, fontSize: '14px' }} />
          </SearchIconWrapper>
          <StyledInputBase
            sx={{ fontSize: '14px' }}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Button variant="contained" sx={{ boxShadow: 'none', bgcolor: INPUT_FIELD_COLOR, borderRadius: '10px', gap: 1 }}>
          <FileDownloadIcon sx={{ color: GRAY_COLOR, fontSize: '14px' }} />
          <Typography sx={{ color: GRAY_COLOR, fontWeight: 500, fontSize: '14px' }}>Import</Typography>
        </Button>

        <Button variant="contained" sx={{ boxShadow: 'none', bgcolor: BLUE_COLOR, borderRadius: '10px', color: '#fff', gap: 1 }} onClick={handleDialogOpen}>
          <AddIcon sx={{ fontSize: '14px' }} />
          <Typography sx={{ fontSize: '14px' }}>Add</Typography>
        </Button>

        <Dialog open={openDialog} onClose={handleDialogClose} PaperProps={{
          sx: {
            width: '700px',
            maxWidth: '90%',
            bgcolor: INPUT_FIELD_COLOR,
            borderRadius: '30px',
          }
        }}>
          <DialogTitle sx={{ marginTop: 4 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 30, textAlign: 'center' }}>Add Services</Typography>
          </DialogTitle>

          <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {['Enter name', 'Enter date of birth', 'Enter full name', 'Enter start date', 'Enter email', 'Enter phone number'].map((label) => (
              <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', mt: 5 }} key={label}>
                <Typography sx={{ fontWeight: 600, fontSize: 18 }}>{label}</Typography>
                <StyledTextField placeholder={label} variant="outlined" />
              </Box>
            ))}

            {/* Set Status */}
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', mt: 5 }}>
              <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Set status</Typography>
              <Button
                id="status-button"
                aria-controls={isMenuOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? 'true' : undefined}
                onClick={handleMenuClick}
                sx={{
                  boxShadow: 'none',
                  bgcolor: INPUT_FIELD_COLOR,
                  borderRadius: '14px',
                  gap: 1,
                  border: '1px solid rgb(165 180 179)',
                  color: 'rgb(165 180 179)',
                  width: '600px',
                  height: '55px',
                  mt: 2
                }}
              >
                Set status
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                  sx: {
                    borderRadius: '12px',            // Rounded corners
                    boxShadow: 'none',  // Subtle shadow for depth
                    minWidth: '600px',                // Minimum width
                    bgcolor: 'background.paper',      // Background color from theme
                  },
                }}
              >
                <MenuItem onClick={handleMenuClose} >Suspended</MenuItem>
                <MenuItem onClick={handleMenuClose}>Active</MenuItem>
                <MenuItem onClick={handleMenuClose}>In active</MenuItem>
              </Menu>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleDialogClose} sx={{ bgcolor: BLUE_COLOR, borderRadius: '14px', color: 'white', width: '100px', height: '40px', mr: 6, mb: 3 }}>
              Close
            </Button>
          </DialogActions>
        </Dialog >
      </Box >

      <Box sx={{ mt: 3, mb: 3 }}>
        <DynamicDataGrid data={serviceDatas} />
      </Box>
      <BackdropComponent open={loading} />
    </Box >
  )
}

export default BookingPageDetails
