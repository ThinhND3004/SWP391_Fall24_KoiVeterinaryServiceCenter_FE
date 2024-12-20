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
import ManagementApi from '../../../api/ManagementApi'
import { useEffect, useState } from "react";
import BackdropComponent from '~/components/Backdrop.component'

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

function StaffCustomerPageDetails() {
  const [customerData, setCustomerData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const data = await ManagementApi.getAccounts('CUSTOMER');
    setCustomerData(data)
  }

  const handleSearching = async (event) => {
    const searchValue = event.target.value || "";

    let data;
    if (searchValue === "")
      data = await ManagementApi.getAccounts('CUSTOMER');
    else {
      const searchData = await ManagementApi.searchAccountsByFullName('CUSTOMER', searchValue);
      data = searchData.filter((data) => {
        return data.fullName.toLowerCase().includes(searchValue.toLowerCase());
      });
    }

    setSearchValue(searchValue);
    setCustomerData(data.length > 0 ? data : []);
  }

  useEffect(() => {
    fetchData()
  }, []);


  return (
    <div>
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
              value={searchValue}
              onChange={handleSearching}
            />
          </Search>
        </Box>
      </Box>

      {/* Table */}
      <Box sx={{ mt: 3, mb: 3 }}>
        <DynamicDataGrid data={customerData} />
      </Box>
      {/* <BackdropComponent open={loading} /> */}
    </div>
  )
}

export default StaffCustomerPageDetails
