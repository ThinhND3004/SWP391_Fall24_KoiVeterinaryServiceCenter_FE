import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  TextField,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import api, { geoapifyApi } from "~/config/axios";
import dayjs from "dayjs";
import "leaflet/dist/leaflet.css";
import { BLUE_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from "~/theme";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// Marker's icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function BookingForm({
  service,
  selectedDateTime,
  veterinarian,
}) {
  const navigate = useNavigate();
  const [dateTime, setDateTime] = React.useState(null);
  const [additionalInfo, setAdditionalInfo] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [statusMessage, setStatusMessage] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [routeCoords, setRouteCoords] = React.useState(null); // To store route coordinates
  const [userPosition, setUserPosition] = React.useState([0, 0]);
  const [vetPosition, setVetPosition] = React.useState([10.845, 106.772]); // Default for Thủ Đức
  const [selectedPondSize, setSelectedPondSize] = React.useState("SMALL_POND");
  const [quantity, setQuantity] = React.useState(1);
  const displayedDateTime = dayjs
    .utc(selectedDateTime)
    .tz("Asia/Ho_Chi_Minh", true);

  const [userAddress, setUserAddress] = React.useState("");
  const [addressError, setAddressError] = React.useState(false);

  const [distance, setDistance] = React.useState(0);
  const [distanceError, setDistanceError] = React.useState(false);

  const pondSizes = [
    { value: "SMALL_POND", label: "Small Pond" },
    { value: "MEDIUM_POND", label: "Medium Pond" },
    { value: "LARGE_POND", label: "Large Pond" },
  ];

  // Quantity Function with default value is 1
  /**
   *
   * @param {*} event
   */
  const handleQuantityChange = (event) => {
    const newQuantity = Math.max(1, parseInt(event.target.value, 10));
    setQuantity(newQuantity);
  };

  // Pond Function with default value is Small Pond
  /**
   *
   * @param {*} event
   */
  const handlePondSizeChange = (event) => {
    setSelectedPondSize(event.target.value);
  };

  // console.log(selectedDateTime);
  // console.log(veterinarian);
  // console.log(veterinarian.email)

  // React.useEffect(() => {
  //   if (selectedDateTime) {
  //     setDateTime(dayjs(selectedDateTime));  // Đảm bảo selectedDateTime được chuyển thành Day.js
  //   }
  // }, [selectedDateTime]);

  //Fetch Autocomplete API
  /**
   *
   */
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

  /**
   *
   * @param {*} suggestion
   */
  const handleSuggestionClick = async (suggestion) => {
    setUserAddress(suggestion.properties.formatted);
    setSuggestions([]);
    setStatusMessage("Address has been selected!");

    const coords = await fetchCoordinates(suggestion.properties.formatted);
    setUserPosition([coords.lat, coords.lon]); // Cập nhật vị trí của người dùng
    fetchDistance(suggestion.properties.formatted); // Tính toán khoảng cách sau khi chọn
  };

  /**
   *
   * @param {*} location
   * @returns
   */
  const fetchCoordinates = async (location) => {
    const apiKey = "f89b01272ab747dcb9eb87889236e016";
    const url = `geocode/search?text=${encodeURIComponent(
      location
    )}&apiKey=${apiKey}`;

    try {
      const response = await geoapifyApi.get(url);
      const data = response.data;

      if (data.features && data.features.length > 0) {
        return {
          lat: data.features[0].properties.lat,
          lon: data.features[0].properties.lon,
        };
      } else {
        throw new Error("No coordinates were found for this location");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw error;
    }
  };

  // Routing API
  /**
   *
   * @param {*} address
   */
  const fetchDistance = async (address) => {
    setStatusMessage("Calculating distance...");
    try {
      const userCoords = await fetchCoordinates(address);
      const endCoords = await fetchCoordinates(
        "Long Thanh My Ward, Thủ Đức, Vietnam"
      ); // service.address

      const waypoints = `${userCoords.lat},${userCoords.lon}|${endCoords.lat},${endCoords.lon}`;
      const routingApiKey = "23da6a407e30403b98425c7841641268";
      const url = `routing?waypoints=${waypoints}&mode=drive&apiKey=${routingApiKey}`;

      const response = await geoapifyApi.get(url);
      const data = response.data;

      if (data.features && data.features.length > 0) {
        const km = data.features[0].properties.distance / 1000;

        if (km > 30) {
          setDistance(km.toFixed(2)); // Optionally clear the distance
          setDistanceError(true);
          setStatusMessage(
            "Distance exceeds 30 km. Service cannot be supported."
          );
        } else {
          setDistance(km.toFixed(2));
          setDistanceError(false);
          setStatusMessage("Calculate distance successfully!");
        }

        const coordinates = data.features[0].geometry.coordinates; // Get route coordinates
        const latLngs = coordinates.map((coord) => [coord[1], coord[0]]); // Swap lat/lon order
        setRouteCoords(latLngs); // Set route coordinates
      } else {
        setStatusMessage("Cannot calculate distance");
        setDistance(null); // Clear distance if unable to calculate
      }
    } catch (error) {
      setStatusMessage("Error: " + error.message);
      setDistance(null); // Clear distance in case of error
    }
  };

  /**
   *
   * @param {*} e
   */
  const handleAddressChange = (e) => {
    const input = e.target.value;
    setUserAddress(input);
    setAddressError(false);
    fetchAddressSuggestions(input);
  };

  console.log(distance);

  console.log(distanceError);

  //function handle to Submit all info
  /**
   *
   * @param {*} event
   * @returns
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userAddress.trim()) {
      setAddressError(true); // Set error if address is empty
      return;
    }

    if (distance > 30.0) {
      setDistanceError(true); // Set distance error if it exceeds 30 km
      return;
    }

    // Prevent submission if there's any error
    if (addressError || distanceError) {
      return;
    }

    const bookingData = {
      veterianEmail:
        veterinarian && veterinarian.email ? veterinarian.email : null, // Kiểm tra veterinarian có null không
      serviceId: service.id,
      additionalInformation: additionalInfo || "",
      koiQuantity: quantity || 0,
      pondSize: selectedPondSize || "",
      distanceMeters: distance || 0,
      userAddress: userAddress || "",
      meetingMethod: service.meetingMethod,
      startAt: selectedDateTime,
    };

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

        {/* Select Date and Time Field  */}
        <TextField
          value={displayedDateTime.format("DD/MM/YYYY HH:mm")}
          disabled
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "15px",
              borderColor: BLUE_COLOR,
              height: "60px",
              marginTop: "15px",
              "&.Mui-focused fieldset": {
                borderColor: BLUE_COLOR,
              },
            },
            "& input": {
              backgroundColor: INPUT_FIELD_COLOR,
              padding: "20px 15px",
              fontSize: "16px",
              borderRadius: "15px",
            },
          }}
        />
      </div>

      {/* Select Pond Size Field (If this is Pond Quality Service)  */}
      {service.name !== "Koi Treatment at home" &&
        service.name !== "Koi Treatment at center" &&
        service.name !== "Online Consultant" && (
          <FormControl
            fullWidth
            sx={{
              mt: 2,
              borderRadius: "15px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
              },
              "& .MuiInputLabel-root": {
                fontSize: "16px",
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Select Pond Size:
            </Typography>
            <Select
              value={selectedPondSize}
              onChange={handlePondSizeChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                  borderColor: BLUE_COLOR,
                  height: "60px",
                },
                "& .MuiSelect-select": {
                  backgroundColor: INPUT_FIELD_COLOR,
                  padding: "20px 15px",
                  fontSize: "16px",
                  borderRadius: "15px",
                },
              }}
            >
              {pondSizes.map((pond) => (
                <MenuItem key={pond.value} value={pond.value}>
                  {pond.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

      {/* Display quantity if service name is "Koi Treatment at home" or "Koi Treatment at center" */}
      {(service.name === "Koi Treatment at home" ||
        service.name === "Koi Treatment at center") && (
        <FormControl fullWidth sx={{ mt: 2 }}>
          <Typography variant="h6">Quantity:</Typography>
          <TextField
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            placeholder="Enter quantity"
            variant="outlined"
            fullWidth
            inputProps={{
              min: 1,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                borderColor: BLUE_COLOR,
                height: "60px",
              },
              "& input": {
                backgroundColor: INPUT_FIELD_COLOR,
                padding: "20px 15px",
                fontSize: "16px",
                borderRadius: "15px",
              },
            }}
          />
        </FormControl>
      )}

      {/* Address Field (if this is OFFLINE_HOME service)  */}
      {service.meetingMethod !== "ONLINE" &&
        service.meetingMethod !== "OFFLINE_CENTER" && (
          <div>
            <Typography variant="h6">Address: </Typography>
            <TextField
              placeholder="Enter your address"
              variant="outlined"
              fullWidth
              value={userAddress}
              onChange={handleAddressChange}
              error={addressError} // Error state applied to TextField
              helperText={addressError ? "Address is required." : ""}
              sx={{
                // width: '600px',
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                  borderColor: BLUE_COLOR,
                  height: "60px",
                  marginTop: "15px",
                  "&.Mui-focused fieldset": {
                    borderColor: BLUE_COLOR,
                  },
                },
                "& input": {
                  backgroundColor: INPUT_FIELD_COLOR,
                  padding: "20px 15px",
                  fontSize: "16px",
                  borderRadius: "15px",
                },
              }}
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

      {/* The service range must equal or less than 30km  */}
      {service.meetingMethod !== "ONLINE" &&
        service.meetingMethod !== "OFFLINE_CENTER" && (
          <>
            <Typography variant="h6">Distance: {distance} km</Typography>
            {distance >= 30 && (
              <Typography variant="h6" color="error">
                The service only supports distances of 30 km or less
              </Typography>
            )}
          </>
        )}

      <div>
        <Typography variant="h6" gutterBottom>
          Additional Information
        </Typography>
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "15px",
              borderColor: BLUE_COLOR,
              height: "250px",
              marginTop: "15px",
              "&.Mui-focused fieldset": {
                borderColor: BLUE_COLOR,
              },
            },
            "& input": {
              backgroundColor: INPUT_FIELD_COLOR,
              height: "220px",
              fontSize: "16px",
              borderRadius: "15px",
            },
          }}
          placeholder="Additional Information"
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
          height: "400px",
        }}
      >
        {/* Display map  */}
        <MapContainer
          center={[10.8231, 106.6297]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {userPosition && (
            <Marker position={userPosition}>
              <Popup>Your position</Popup>
            </Marker>
          )}
          {vetPosition && (
            <Marker position={vetPosition}>
              <Popup>Koi Clinic Center Position</Popup>
            </Marker>
          )}
          {routeCoords && <Polyline positions={routeCoords} color="blue" />}
        </MapContainer>
      </Box>

      <Box
        variant="contained"
        onClick={handleSubmit}
        sx={{
          display: "flex",
          width: "100%",
          height: "60px",
          backgroundColor: BLUE_COLOR,
          borderRadius: "40px",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
          mb: 10,
          cursor: "pointer",
        }}
      >
        <Typography sx={{ textAlign: "center", color: "white" }}>
          Submit Booking
        </Typography>
      </Box>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert onClose={() => setSuccessMessage("")} severity="success">
          {successMessage}
        </Alert>
        Snack
      </Snackbar>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage("")}
      >
        <Alert onClose={() => setErrorMessage("")} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!statusMessage}
        autoHideDuration={6000}
        onClose={() => setStatusMessage("")}
      >
        <Alert onClose={() => setStatusMessage("")} severity="info">
          {statusMessage}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
}
