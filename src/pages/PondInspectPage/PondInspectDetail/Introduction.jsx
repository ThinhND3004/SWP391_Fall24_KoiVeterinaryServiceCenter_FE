import React from "react";
import { BLUE_COLOR, ORANGE_COLOR, OFFLINE_BUTTON } from "~/theme";
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
              backgroundColor: OFFLINE_BUTTON,
              color: "white",
              width: 170,
              borderRadius: "10px",
              height: "30px",
              lineHeight: "30px", // Căn giữa nội dung theo chiều dọc
            }}
          >
            {service.meetingMethod}
          </Typography>

          <Typography sx={{ fontWeight: 400, fontSize: 16, lineHeight: 2 }}>
            {service.overview}
          </Typography>

          <Box sx={{ marginTop: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Price:
              </Typography>
              <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                ${service.price}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Estimated Time:
              </Typography>
              <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                {service.estimatedTime || "N/A"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Address:
              </Typography>
              <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                {service.address || "N/A"}
              </Typography>
            </Box>
          </Box>
        </Box>

        <img
          src="https://cdn.shopify.com/s/files/1/1083/2612/files/koi2_480x480.jpg?v=1719301650"
          alt="Koi service"
          style={{ objectFit: "contain", width: "500px", borderRadius: "26px" }}
        />
      </Box>
    </div>
  );
}

export default Introduction;
