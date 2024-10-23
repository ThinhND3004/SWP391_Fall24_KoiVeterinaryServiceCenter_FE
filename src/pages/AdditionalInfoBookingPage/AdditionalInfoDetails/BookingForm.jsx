import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField, Typography, Box, List, ListItem, ListItemText, Button, Snackbar, Alert } from "@mui/material";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import api, { geoapifyApi } from "~/config/axios";
import dayjs from 'dayjs';
import 'leaflet/dist/leaflet.css';

// Marker's icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function BookingForm({ service, selectedDateTime, veterinarian }) {
  const [dateTime, setDateTime] = React.useState(null);
  const [userAddress, setUserAddress] = React.useState("");
  const [additionalInfo, setAdditionalInfo] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [statusMessage, setStatusMessage] = React.useState("");
  const [distance, setDistance] = React.useState(0);
  const [suggestions, setSuggestions] = React.useState([]);
  const [routeCoords, setRouteCoords] = React.useState(null); // To store route coordinates
  const [userPosition, setUserPosition] = React.useState([0, 0]);
  const [vetPosition, setVetPosition] = React.useState([10.845, 106.772]); // Default for Thủ Đức

  React.useEffect(() => {
    if (selectedDateTime) {
      setDateTime(dayjs(selectedDateTime));  // Đảm bảo selectedDateTime được chuyển thành Day.js
    }
  }, [selectedDateTime]);

  const fetchAddressSuggestions = React.useCallback(
    debounce(async (input) => {
      if (!input) return;
      const apiKey = "9a1c61129d2b4ba79e3857d231f70660";
      const url = `geocode/autocomplete?text=${input}&apiKey=${apiKey}`;

      try {
        const response = await geoapifyApi.get(url);
        setSuggestions(response.data.features);
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
      }
    }, 300),
    [] // debounce with 300ms delay
  );

  const handleAddressChange = (e) => {
    const input = e.target.value;
    setUserAddress(input);
    fetchAddressSuggestions(input);
  };

  const handleSuggestionClick = async (suggestion) => {
    setUserAddress(suggestion.properties.formatted);
    setSuggestions([]);
    setStatusMessage("Địa chỉ đã được chọn!");
    
    const coords = await fetchCoordinates(suggestion.properties.formatted);
    setUserPosition([coords.lat, coords.lon]); // Cập nhật vị trí của người dùng
    fetchDistance(suggestion.properties.formatted); // Tính toán khoảng cách sau khi chọn
  };

  const fetchCoordinates = async (location) => {
    const apiKey = "f89b01272ab747dcb9eb87889236e016";
    const url = `geocode/search?text=${encodeURIComponent(location)}&apiKey=${apiKey}`;

    try {
      const response = await geoapifyApi.get(url);
      const data = response.data;

      if (data.features && data.features.length > 0) {
        return {
          lat: data.features[0].properties.lat,
          lon: data.features[0].properties.lon,
        };
      } else {
        throw new Error("Không tìm thấy tọa độ cho địa điểm này");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw error;
    }
  };

  // Routing API
  const fetchDistance = async (address) => {
    setStatusMessage("Đang tính toán khoảng cách...");
    try {
      const userCoords = await fetchCoordinates(address);
      const endCoords = await fetchCoordinates("Long Thanh My Ward, Thủ Đức, Vietnam"); // service.address

      const waypoints = `${userCoords.lat},${userCoords.lon}|${endCoords.lat},${endCoords.lon}`;
      const routingApiKey = "23da6a407e30403b98425c7841641268";
      const url = `routing?waypoints=${waypoints}&mode=drive&apiKey=${routingApiKey}`;

      const response = await geoapifyApi.get(url);

      const data = response.data;
      if (data.features && data.features.length > 0) {
        const km = data.features[0].properties.distance / 1000;
        setDistance(km.toFixed(2));

        const coordinates = data.features[0].geometry.coordinates; // Get route coordinates
        const latLngs = coordinates.map((coord) => [coord[1], coord[0]]); // Swap lat/lon order
        setRouteCoords(latLngs); // Set route coordinates

        setStatusMessage("Tính toán khoảng cách thành công!");
      } else {
        setStatusMessage("Không thể tính toán khoảng cách");
      }
    } catch (error) {
      setStatusMessage("Lỗi: " + error.message);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookingData = {
      serviceId: service.id,
      veterinarianId: veterinarian && veterinarian.id ? veterinarian.id : null, // Kiểm tra veterinarian có null không
      additionalInformation: additionalInfo || "", 
      servicePrice: service.price || 0,
      distanceMeters: distance || 0,
      userAddress: userAddress || "", 
      meetingMethod: service.meetingMethod || "online",
      startAt: dateTime ? dateTime.toISOString() : new Date().toISOString(), 
      travelPrice: service.travelPricePerMeter || 0,
    };
    

    // Chuyển hướng người dùng sang trang xác nhận
    navigate("/confirm-booking", {
      state: {
        createBookingDTO: bookingData,
        serviceEntity: service,
        veterinarianEntity: veterinarian,
      },
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Typography variant="h6" gutterBottom>
          Selected Date and Time
        </Typography>
        <TextField
          label={dateTime ? dateTime.format('YYYY-MM-DD HH:mm') : ""}
          value={dateTime ? dateTime.format('YYYY-MM-DD HH:mm') : ""}
          disabled
          fullWidth
          sx={{ marginBottom: "20px" }}
        />
      </div>

      {service.meetingMethod !== "ONLINE" &&
        service.meetingMethod !== "OFFLINE_CENTER" && (
          <div>
            <Typography variant="h6">Address: </Typography>
            <TextField
              label="Address"
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

      {service.meetingMethod !== "ONLINE" &&
        service.meetingMethod !== "OFFLINE_CENTER" && (
          <Typography variant="h6">
            Distance: {distance} km
          </Typography>
        )}

      <div>
        <Typography variant="h6" gutterBottom>
          Additional Information
        </Typography>
        <TextField
          label="Additional Information"
          variant="outlined"
          fullWidth
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
      </div>

      <Box
        mt={3}
        mb={3}
        sx={{
          height: "400px", // Chiều cao bản đồ cố định
        }}
      >
        <MapContainer
          center={[10.8231, 106.6297]} // Trung tâm bản đồ
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {userPosition && (
            <Marker position={userPosition}>
              <Popup>Vị trí của bạn</Popup>
            </Marker>
          )}
          {vetPosition && (
            <Marker position={vetPosition}>
              <Popup>Vị trí bác sĩ thú y</Popup>
            </Marker>
          )}
          {routeCoords && (
            <Polyline positions={routeCoords} color="blue" />
          )}
        </MapContainer>
      </Box>

      <Button variant="contained" onClick={handleSubmit}>
        Submit Booking
      </Button>

      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage("")}>
        <Alert onClose={() => setSuccessMessage("")} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage("")}>
        <Alert onClose={() => setErrorMessage("")} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={!!statusMessage} autoHideDuration={6000} onClose={() => setStatusMessage("")}>
        <Alert onClose={() => setStatusMessage("")} severity="info">
          {statusMessage}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
}
