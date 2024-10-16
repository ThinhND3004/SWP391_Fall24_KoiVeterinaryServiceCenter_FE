// import { Typography } from '@mui/material'
import React from "react";
// import { BLUE_COLOR, ORANGE_COLOR } from '~/theme'
import { Box, Typography, Button } from "@mui/material";
import {
  BG_COLOR,
  BLUE_COLOR,
  GRAY_COLOR,
  OFFLINE_CENTER_BUTTON,
  ONLINE_BUTTON,
  ORANGE_COLOR,
} from "~/theme";

function Introduction({ service }) {
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "600px", borderRadius: "26px" }}>
          <Typography
            sx={{
              fontFamily: "SVN-Konga Pro",
              fontSize: "45px",
              color: BLUE_COLOR,
              display: "flex",
              justifyContent: "start",
            }}
          >
            <span style={{ color: BLUE_COLOR, marginLeft: "8px" }}>
              {service.name}{" "}
            </span>
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              backgroundColor: ONLINE_BUTTON,
              color: "white",
              width: 100,
              borderRadius: "10px",
              height: "30px",
            }}
          >
            {service.meetingMethod}
          </Typography>
          {/* </div> */}
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

            {service.travelPricePerMeter > 0 && (
              <p>
                <strong>Travel Price: </strong>
                {service.travelPricePerMeter} $/meter
              </p>
            )}
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
