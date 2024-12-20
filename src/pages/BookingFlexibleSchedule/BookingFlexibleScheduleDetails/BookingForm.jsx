import * as React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { TextField, Typography, Box, List, ListItem, ListItemText, Button, Snackbar, Alert } from '@mui/material'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { debounce } from 'lodash'
import { useNavigate } from 'react-router-dom'
import api, { geoapifyApi } from '~/config/axios'
import veterinarian from '~/layouts/VeterinarianLayout/veterinarian.layout'
import { BLUE_COLOR, INPUT_FIELD_COLOR } from '~/theme'
// import geoapifyApi from "~/config/axios";

//Marker's icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
})

export default function BookingForm({ service }) {
  const [dateTime, setDateTime] = React.useState(null)
  const [userAddress, setUserAddress] = React.useState('')
  const [additionalInfo, setAdditionalInfo] = React.useState('')
  const [successMessage, setSuccessMessage] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')
  const [statusMessage, setStatusMessage] = React.useState('')
  const [distance, setDistance] = React.useState(0)
  const [suggestions, setSuggestions] = React.useState([])
  // const [position, setPosition] = React.useState([51.505, -0.09]);

  // Debounced Autocomplete Address Fetch
  const fetchAddressSuggestions = React.useCallback(
    debounce(async (input) => {
      if (!input) return
      const apiKey = '9a1c61129d2b4ba79e3857d231f70660'
      const url = `geocode/autocomplete?text=${input}&apiKey=${apiKey}`

      try {
        const response = await geoapifyApi.get(url)

        setSuggestions(response.data.features)
      } catch (error) {
        console.error('Error fetching address suggestions:', error)
      }
    }, 300),
    [] // debounce with 300ms delay
  )

  const handleAddressChange = (e) => {
    const input = e.target.value
    setUserAddress(input)
    fetchAddressSuggestions(input)
  }

  const handleSuggestionClick = (suggestion) => {
    setUserAddress(suggestion.properties.formatted)
    setSuggestions([])
    setStatusMessage('Địa chỉ đã được chọn!')
    fetchDistance(suggestion.properties.formatted) // Tính toán khoảng cách sau khi chọn
  }

  const fetchCoordinates = async (location) => {
    const apiKey = 'f89b01272ab747dcb9eb87889236e016'
    const url = `geocode/search?text=${encodeURIComponent(location)}&apiKey=${apiKey}`

    try {
      const response = await geoapifyApi.get(url)
      const data = response.data

      if (data.features && data.features.length > 0) {
        return {
          lat: data.features[0].properties.lat,
          lon: data.features[0].properties.lon
        }
      } else {
        throw new Error('Không tìm thấy tọa độ cho địa điểm này')
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error)
      throw error
    }
  }

  // Routing API
  const fetchDistance = async (address) => {
    setStatusMessage('Đang tính toán khoảng cách...')
    try {
      const userCoords = await fetchCoordinates(address)
      const endCoords = await fetchCoordinates(
        'Long Thanh My Ward, Thủ Đức, Vietnam'
      ) //service.address
      const waypoints = `${userCoords.lat},${userCoords.lon}|${endCoords.lat},${endCoords.lon}`
      const routingApiKey = '23da6a407e30403b98425c7841641268'
      const url = `routing?waypoints=${waypoints}&mode=drive&apiKey=${routingApiKey}`

      const response = await geoapifyApi.get(url)

      const data = response.data
      if (data.features && data.features.length > 0) {
        const km = data.features[0].properties.distance / 1000
        setDistance(km.toFixed(2))
        setStatusMessage('Tính toán khoảng cách thành công!')
      } else {
        setStatusMessage('Không thể tính toán khoảng cách')
      }
    } catch (error) {
      setStatusMessage('Lỗi: ' + error.message)
    }
  }

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    // if (!dateTime || !userAddress || !service) {
    //   setErrorMessage("Please fill in all required fields.");
    //   return;
    // }

    const bookingData = {
      serviceId: service.id,
      veterinarianId: null,
      additionalInformation: additionalInfo,
      servicePrice: service.price, // Giả sử service có thuộc tính price
      distanceMeters: distance,
      userAddress: userAddress,
      meetingMethod: service.meetingMethod,
      startAt: dateTime ? dateTime.toISOString() : null,
      travelPrice: service.travelPricePerMeter
    }

    // Chuyển hướng người dùng sang trang xác nhận
    navigate('/confirm-booking', {
      state: {
        createBookingDTO: bookingData,
        serviceEntity: service
      }
    })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Typography variant="h6" gutterBottom>
          Select Date and Time
        </Typography>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker
            label={dateTime ? dateTime.toLocaleString() : ''}
            value={dateTime}
            onChange={(newValue) => setDateTime(newValue)}
            sx={{
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
                fontSize: '16px',
                borderRadius: '15px'
              }
            }}
          />
        </DemoContainer>
      </div>

      {service.meetingMethod !== 'ONLINE' &&
        service.meetingMethod !== 'OFFLINE_CENTER' && (
          <div>
            <Typography variant="h6">Address: </Typography>
            <TextField sx={{
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
                padding: '20px 15px',
                backgroundColor: INPUT_FIELD_COLOR,
                fontSize: '16px',
                borderRadius: '15px'
              }
            }}
              // label="Address"
              placeholder='Enter your address'
              variant="outlined"
              fullWidth
              value={userAddress}
              onChange={handleAddressChange}
            />
            {suggestions.length > 0 && (
              <List>
                {suggestions.map((suggestion) => (
                  <ListItem
                    key={suggestion.properties.osm_id}
                    button
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <ListItemText primary={suggestion.properties.formatted} />
                  </ListItem>
                ))}
              </List>
            )}
          </div>
        )}

      {service.meetingMethod !== 'ONLINE' &&
        service.meetingMethod !== 'OFFLINE_CENTER' && (
          <Typography variant="h6">
            Distance: {distance !== null ? `${distance} km` : 'N/A'}
          </Typography>
        )}

      {/* Nhúng bản đồ ở đây */}
      {/* <Box sx={{ marginTop: "20px", height: "400px", position: "relative" }}>
         <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%", position: "absolute" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>Your selected location: {userAddress}</Popup>
          </Marker>
        </MapContainer>
       </Box> */}

      <div>
        <Typography variant="h6" gutterBottom>
          Additional Information (optional)
        </Typography>
        <Box sx={{ marginTop: '20px', backgroundColor: INPUT_FIELD_COLOR, borderRadius: '14px' }}>
          <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '15px',
                backgroundColor: INPUT_FIELD_COLOR, // Apply background color to the entire field
                marginTop: '15px',
                '&:hover fieldset': {
                  borderColor: BLUE_COLOR, // Optional: Change border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: BLUE_COLOR, // Change border color when focused
                },
              },
              '& .MuiOutlinedInput-root textarea': {
                fontSize: '16px', // Style for textarea content
              },
            }}
            placeholder="Additional Information"
            variant="outlined"
            fullWidth
            multiline
            rows={5}
            maxRows={7}
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
        </Box>
      </div>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        sx={{ borderRadius: '30px', height: '60px', mb: 5 }}
      >
        Booking
      </Button>

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
      >
        <Alert onClose={() => setErrorMessage('')} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
    // eslint-disable-next-line semi
  );
}
