import { styled, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { BLUE_COLOR, GRAY_COLOR, INPUT_FIELD_COLOR } from '~/theme'
import Button from '@mui/material/Button'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { Typography } from '@mui/material'
import DynamicDataGrid from './testGrid'
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import api from "~/config/axios";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: INPUT_FIELD_COLOR
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




function CustomerBookingPageDetails() {
  const [bookings, setBookings] = useState([]);
const navigate = useNavigate();

useEffect(() => {
  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const page = 1;
        const unitPerPage = 10;
        const status = "COMPLETED";

        const response = await api.get(
          `/bookings?page=${page}&unitPerPage=${unitPerPage}&status=${status}`
        );

        if (!response) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        setBookings(data.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    } else {
      navigate("/login");
    }
  };

  fetchBookings();
}, [navigate]);


  // Hàm tạo dữ liệu hàng từ BookingDTO
  const createRowFromBooking = (booking) => {
    return {
      serviceName: booking.serviceName,
      veterinarianFullName: booking.veterinarianFullName,
      meetingMethod: booking.meetingMethod,
      totalPrice: new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0, // Số phần thập phân tối thiểu
      }).format(booking.totalPrice),
      startDate: booking.startedAt,
      endDate: booking.endedAt ? booking.endedAt : "none", 
      status: booking.statusEnum
    };
  };

  // Tạo các hàng từ danh sách bookings
  const rows = bookings.map(createRowFromBooking);
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
        <DynamicDataGrid data={rows} />
      </Box>
    </Box>
  )
}

export default CustomerBookingPageDetails
