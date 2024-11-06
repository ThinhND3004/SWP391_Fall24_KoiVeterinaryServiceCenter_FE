import { styled, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { BLUE_COLOR, GRAY_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { Typography } from '@mui/material'
import DynamicDataGrid from './testGrid'
import ManagementApi from '~/api/ManagementApi'
import { useEffect, useState } from 'react'
import TimeUtils from '~/utils/TimeUtils'

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


function VeterinarianBookingPageDetails() {
  const [rowData, setRowData] = useState([]);
  const [navBarStatus, setNavBarStatus] = useState("ALL")


  const fetchDataByStatus = async (status) => {
    let data = [];

    if (status === 'ALL') data = await ManagementApi.getVeterianBookings({});
    else data = await ManagementApi.getVeterianBookings({status: status});

    const row = data.map((data) => {
      return {
        id: data.id,
        customer: data.customerFullName,
        service: data.serviceName,
        createdAt: TimeUtils.formatDateTime(data.createdAt),
        startedAt: TimeUtils.formatDateTime(data.startedAt),
        status: data.statusEnum,
        details: data
      };
    })
    setRowData(row);
  }

  function TableNavBar({ content, navBarStatus }) {
    return (
      <Button variant="contained" color="primary" sx={{
        backgroundColor: navBarStatus === content ? ORANGE_COLOR : '',
        color: navBarStatus === content ? 'white' : '',
        borderRadius: '10px',
        boxShadow: 'none'
      }}
        onClick={() => {
          fetchDataByStatus(content);
          setNavBarStatus(content);
        }}
      >
        {content}
      </Button>
    )
  }

  useEffect(() => {
    fetchDataByStatus('ALL');
  }, []);


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


        </Box>
      </Box>
      {/* Booking Nav Bar  */}
      <Box display="flex" flexDirection="row" gap={2} marginTop={3}>
        <TableNavBar content={'ALL'} navBarStatus={navBarStatus} />
        <TableNavBar content={'CONFIRMED'} navBarStatus={navBarStatus} />
        <TableNavBar content={'COMPLETED'} navBarStatus={navBarStatus} />
      </Box>
      {/* Table */}
      <Box sx={{ mt: 3, mb: 3 }}>
        <DynamicDataGrid rowData={rowData} />
      </Box>
    </Box>
  )
}

export default VeterinarianBookingPageDetails
