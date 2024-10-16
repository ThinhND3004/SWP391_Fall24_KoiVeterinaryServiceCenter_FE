import React from "react";
import { BLUE_COLOR, ORANGE_COLOR, OFFLINE_CENTER_BUTTON } from "~/theme";
import { Box, Typography } from "@mui/material";

function Introduction({ service }) {
  console.log(service);
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "600px", borderRadius: "26px" }}>
          <Typography
            sx={{
              fontFamily: "SVN-Konga Pro",
              fontSize: "48px",
              color: BLUE_COLOR,
              display: "flex",
              justifyContent: "start",
            }}
          >
            {service.name}{" "}
            <span style={{ color: ORANGE_COLOR, marginLeft: "8px" }}></span>
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              backgroundColor: OFFLINE_CENTER_BUTTON,
              color: "white",
              width: 170,
              borderRadius: "10px",
              height: "30px",
            }}
          >
            {service.meetingMethod}
          </Typography>

          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 2,
              marginTop: "20px",
            }}
          >
            {service.overview}

            <p>
              <strong>Price:</strong> ${service.price}
            </p>

            <p>
              <strong>Estimated Time:</strong> {service.estimatedTime || "N/A"}
            </p>
            
            <p>
              <strong>Travel Price : </strong>{" "}
              {service.travelPricePerMeter || "N/A"} $/meter
            </p>

            <p>
              <strong>Address:</strong> {service.address || "N/A"}
            </p>
          </Typography>
        </Box>
        <img
          src="https://cdn.shopify.com/s/files/1/1083/2612/files/koi2_480x480.jpg?v=1719301650"
          style={{ objectFit: "contain", width: "500px", borderRadius: "26px" }}
        />
      </Box>
    </div>
  );
}

export default Introduction;
