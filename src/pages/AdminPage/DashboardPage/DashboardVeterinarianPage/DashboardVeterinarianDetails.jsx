import { Box, Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import { INPUT_FIELD_COLOR } from '~/theme'
import { BarChartPro } from '@mui/x-charts-pro/BarChartPro'

import { useEffect, useState } from 'react'
import api from '~/config/axios'

function DashboardVeterinarianDetails() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
     try {
       const response = await api.get('/dashboard/veterinarian')
       const data = await response.data
       if (data.data) {
        setData(data.data.data)
       }
       console.log(data)
     } catch (error) {
       console.error('Error fetching dashboard data:', error)
     }
    }
    fetchData()
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
          {/* {userInfo.firstName} {userInfo.lastName} */}
        </Typography>
        <Typography sx={{
          fontWeight: 600, fontSize: '20px'
        }}
        >
          Veterinarians Dashboard
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', mt: 2, gap: 2 }}>
        <Box sx={{ bgcolor: INPUT_FIELD_COLOR, width: '500px', height: '200px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
            Total Working Time
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: '40px' }}>
            {data.totalWorkTime}hrs
          </Typography>
        </Box>

        {/* <Box sx={{ bgcolor: INPUT_FIELD_COLOR, width: '500px', height: '200px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
            Average Working Time
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: '40px' }}>
          {data.averageWorkingHours}hrs
          </Typography>
        </Box> */}
      </Box>

      {/* <Box sx={{ bgcolor: INPUT_FIELD_COLOR, width: '1020px', mt: 2, height: '200px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
          Average Working Time
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: '40px' }}>
          8hrs
        </Typography>
      </Box> */}

      {/* Chart */}
      <Box sx={{ display: 'flex', gap: 2, mb: 5 }}>
        <Box sx={{ bgcolor: INPUT_FIELD_COLOR, borderRadius: '20px', height: '320px', mt: 2, width: '500px' }}>
          <BarChartPro
            sx={{ mt: 3 }}
            width={500}
            height={320}
            xAxis={[
              {
                scaleType: 'band',
                data: data.totalWorkTimePerMonth ? Object.keys(data.totalWorkTimePerMonth).map((v) => data.totalWorkTimePerMonth[v].name) : [],
                zoom: true
              }
            ]}
            series={[
              {
                label: 'totalWorkTimePerMonth',
                data: data.totalWorkTimePerMonth ? Object.values(data.totalWorkTimePerMonth).map((v) => data.totalWorkTimePerMonth[v].count) : []
              }
            ]}
          />
        </Box>

        <Box sx={{ bgcolor: INPUT_FIELD_COLOR, borderRadius: '20px', height: '320px', mt: 2, width: '500px' }}>
          <BarChartPro
            sx={{ mt: 3 }}
            width={500}
            height={320}
            xAxis={[
              {
                scaleType: 'band',
                data: data.averageWorkTime ? Object.keys(data.averageWorkTime).map((v) => data.averageWorkTime[v].name) : [],
                zoom: true
              }
            ]}
            series={[
              {
                label: 'averageWorkTime',
                data: data.averageWorkTime ? Object.values(data.averageWorkTime).map((v) => data.averageWorkTime[v].average) : []
              }
            ]}
          />
        </Box>
      </Box>
    </div>
  )
}

export default DashboardVeterinarianDetails
