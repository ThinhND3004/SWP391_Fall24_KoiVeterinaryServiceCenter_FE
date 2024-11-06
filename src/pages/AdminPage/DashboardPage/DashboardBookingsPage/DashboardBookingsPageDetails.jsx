import { Box, Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import { INPUT_FIELD_COLOR } from '~/theme'
import { BarChartPro } from '@mui/x-charts-pro/BarChartPro'
import { PieChart } from '@mui/x-charts/PieChart'
import ManagementApi from '~/api/ManagementApi'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart'
import api from '~/config/axios'

function DashboardPageDetails() {


  // //auth
  // useEffect(() => {
  //   const checkRole = ManagementApi.permitFor(["ADMIN"]);
  //   if (!checkRole)
  //   {
  //     // useNavigate("/home");
  //     navigate("/home");
  //   }
  // }, [])

  const [data, setData] = useState([])

  useEffect(() => {


    const fetchData = async () => {
      try {
        const response = await api.get('/dashboard/booking')
        const responeData = await response.data
        if (responeData) {
          setData(responeData.data.data);
          console.log(responeData.data)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }
    fetchData()
  }, []);

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
          Bookings Dashboard
        </Typography>
      </Breadcrumbs>


      <Box sx={{ display: 'flex', gap: 2, mt: 2, alignItems: 'center' }}>
        {/* Chart */}
        <Box sx={{ bgcolor: INPUT_FIELD_COLOR, borderRadius: '20px', height: '320px', mt: 2 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>
            Start Time Daily
          </Typography>
          <LineChart
            xAxis={[
              {
                data: data.startTimeDaily ? Object.keys(data.startTimeDaily).map((v) => {

                  const [hours, minutes] = v.split('_').map(num => num.padStart(2, '0'));

                   return `${hours}:${minutes}`;

                  }) : [],
                scaleType: 'band'
              }
            ]}
            series={[
              {
                data: data.startTimeDaily ? Object.values(data.startTimeDaily) : [],
                area: true,
                baseline: 'min',
              },
            ]}
            width={500}
            height={300}
          />
        </Box>
        <Box sx={{ bgcolor: INPUT_FIELD_COLOR, borderRadius: '20px', height: '320px', mt: 2 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>
            Start Time Weekly
          </Typography>
          <LineChart
            xAxis={[
              {
                data: data.startTimeWeekly ? Object.keys(data.startTimeWeekly) : [],
                scaleType: 'band'
              }
            ]}
            series={[
              {
                data: data.startTimeWeekly ? Object.values(data.startTimeWeekly) : [],
                area: true,
                baseline: 'min',
              },
            ]}
            width={500}
            height={300}
          />
        </Box >
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 5 }}>
        {/* Chart */}
        <Box sx={{ bgcolor: INPUT_FIELD_COLOR, borderRadius: '20px', height: '320px', mt: 2 }}>
          <BarChartPro
            sx={{ mt: 3 }}
            width={600}
            height={300}
            xAxis={[
              {
                scaleType: 'band',
                data: data.revenue ? Object.keys(data.revenue) : [],
                zoom: true
              }
            ]}
            series={[
              {
                label: 'Revenue',
                data: data.revenue ? Object.values(data.revenue) : []
              }
            ]}
          />
        </Box>
      </Box>

      {/* Lower section */}
      <Box sx={{ display: 'flex', gap: 2, mb: 5 }}>
        <Box sx={{ bgcolor: INPUT_FIELD_COLOR, borderRadius: '20px', height: '320px', mt: 2 }}>
          <BarChartPro
            sx={{ mt: 3 }}
            width={600}
            height={300}
            xAxis={[
              {
                scaleType: 'band',
                data: data.services ? Object.keys(data.services).map((v) => data.services[v].name) : [],
                zoom: true
              }
            ]}
            series={[
              {
                label: 'Chosen services',
                data: data.services ? Object.keys(data.services).map((v) => data.services[v].count) : []
              }
            ]}
          />
        </Box>

        <Box
          sx={{
            bgcolor: INPUT_FIELD_COLOR,
            borderRadius: '20px',
            height: '320px',
            mt: 2,
            width: '515px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6" sx={{ mt: 3 }}>
            Service Rating
          </Typography>
          <PieChart
            series={[
              {
                data: Object.keys(data.rating || {}).map((key, index) => ({
                  id: index,
                  value: data.rating[key],
                  label: `Rating ${key}`
                }))
              }
            ]}
            width={400}
            height={200}
          />
        </Box>
      </Box >
    </div >
  )
}

export default DashboardPageDetails
