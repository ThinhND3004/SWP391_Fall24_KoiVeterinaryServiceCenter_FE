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
import StaffApi from './staff-customer.api'


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

function createData(name, dob, fullName, startDate, email, phoneNumber, status) {
  return { name, dob, fullName, startDate, email, phoneNumber, status }
}

function setCustomerTable(){

}

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

function StaffCustomerPageDetails() {
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
        <DynamicDataGrid data={StaffApi.getCustomers()} />
      </Box>
    </div>
  )
}

export default StaffCustomerPageDetails
