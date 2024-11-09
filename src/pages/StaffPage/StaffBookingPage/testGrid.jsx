import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { Box, Button } from '@mui/material'
import { BG_COLOR } from '~/theme'
import { BorderStyle } from '@mui/icons-material'
import BookingDialog from './BookingDialog'
import VeterianChooseDialog from './VeterianChooseDialog'
import { render } from 'react-dom'


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
  '& .MuiDataGrid-cell[data-field="status"]': {
    '&.MuiDataGrid-cell--textActive': {
      color: '#00796b',
      fontWeight: 'bold',
      borderRadius: '4px'
    },
    '&.MuiDataGrid-cell--textSuspended': {
      color: '#e65100',
      fontWeight: 'bold',
      borderRadius: '4px'
    },
    '&.MuiDataGrid-cell--textClosed': {
      color: '#c62828',
      fontWeight: 'bold',
      borderRadius: '4px'
    }
  }
}))

const DynamicDataGrid = ({ rowData, pageSize = 5 }) => {
  if (!rowData || !rowData.length) {
    return <div>No data available</div>
  }

  // Automatically generate columns based on the keys of the first row
  const columns = Object.keys(rowData[0]).map((key) => ({
    field: key,
    headerName: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    flex: 1,
    headerClassName: 'theme--header',
    cellClassName: (params) => key === 'status' ? `MuiDataGrid-cell--text${params.value}` : '',
    renderCell: (params) => {
      const booking = params.row.details;
      if (booking.statusEnum === 'PENDING' && params.field === 'veterian')
        return <VeterianChooseDialog
          bookingId={booking.id}
          serviceId={booking.serviceId}
          serviceName={booking.serviceName}
          serviceMethod={booking.meetingMethod}
          userAddress={booking.userAddress}
          startedAt={booking.startedAt}
        />;

      return <span>{params.value}</span>
    }
  }))


  //Remove rowData.details column
  columns.pop();

  columns.push({
    field: "action",
    headerName: "Action",
    sortable: false,
    flex: 1,
    renderCell: (params) => {
      const booking = params.row.details;

      return (
        <BookingDialog booking={booking} />
      )
    }
  })

  // Rows are filled directly from the data prop
  const rows = rowData.map((item, index) => ({ id: index, ...item }))

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

        //  getRowSpacing={getRowSpacing}
        // rowSpacingType="border"
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