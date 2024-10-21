import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { BG_COLOR } from '~/theme'
import { BorderStyle } from '@mui/icons-material'


const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '.MuiDataGrid-columnSeparator': {
    display: 'none'
  },
  '&.MuiDataGrid-root': {
    border: 0,
    borderStyle: 'none'
  },
  '& .MuiDataGrid-columnHeaders': {
    color: '#333'
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold'
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: '1px solid #e0e0e0'
  },
  '& .MuiDataGrid-row': {
    '&:nth-of-type(even)': {
    }
  },
  '& .MuiDataGrid-cell[data-field="disable"]': {
    '&.MuiDataGrid-cell--true': {
      color: '#00796b',
      fontWeight: 'bold',
      borderRadius: '4px',
      textTransform: 'capitalize'
    },
    '&.MuiDataGrid-cell--textSuspended': {
      color: '#e65100',
      fontWeight: 'bold',
      borderRadius: '4px'
    },
    '&.MuiDataGrid-cell--false': {
      color: '#c62828',
      fontWeight: 'bold',
      borderRadius: '4px',
      textTransform: 'capitalize'
    }
  }
}))

const DynamicDataGrid = ({ data, pageSize = 5 }) => {
  if (!data || !data.length) {
    return <div>No data available</div>
  }

  // Automatically generate columns based on the keys of the first row
  const columns = Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
    flex: 1,
    headerClassName: 'theme--header',
    cellClassName: (params) => 
      key === 'disable'
        ? params.value ? 'MuiDataGrid-cell--true' : 'MuiDataGrid-cell--false'
        : '',
  }));

  // Rows are filled directly from the data prop
  const rows = data.map((item, index) => ({ id: index, ...item }))

  return (
    <Box sx={{
      height: '100%',
      width: '100%',
      '& .theme--header': {
        backgroundColor: BG_COLOR
      }
    }}>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}

      />
    </Box>
  )
}

DynamicDataGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSize: PropTypes.number
}

export default DynamicDataGrid

// Usage Example
// const data = [
//   { name: 'Hedwig F. Nguyen', dob: '01/01/2000', fullName: 'Arcu Vel Foundation', startDate: '03/27/2017', email: 'nunc.ullamcorper@metusvitae.com', phone: '070 8206 9605', status: 'Suspended' },
//   { name: 'Genevieve U. Watts', dob: '01/01/2000', fullName: 'Eget Incorporated', startDate: '07/18/2017', email: 'Nullam.vitae@egestas.edu', phone: '0800 025698', status: 'Closed' },
// ];
// <DynamicDataGrid data={data} pageSize={10} />