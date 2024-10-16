import React from "react";
import { BLUE_COLOR, ORANGE_COLOR } from "~/theme";
import { Box, Typography, Button, Grid } from "@mui/material";

function Content({ service }) {
  return (
    <div>
      {service && (
        <div>
          {/* Hiển thị dữ liệu chi tiết của service */}
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 2,
              // marginTop: "20px",
            }}
          >
            {/* <p>
              <strong>Price:</strong> ${service.price}
            </p>
            <p>
              <strong>Estimated Time:</strong> {service.estimatedTime || "N/A"}
            </p>
            <p>
            <strong>Travel Price : </strong> {service.travelPricePerMeter || "N/A"} $/meter 
            </p> */}
            <p>
              {service.description}
            </p>
            {/* <p>
            <strong>Address:</strong> {service.address || 'N/A'}
            </p> */}
            

            {/* Nếu service đã bị disable, hiển thị thông báo */}
            {service.isDisable && (
              <p style={{ color: "red" }}>
                This service is currently unavailable.
              </p>
            )}
          </Typography>
        </div>
      )}
    </div>

    // <Box sx={{ padding: '20px', backgroundColor: "primary", borderRadius: '8px' }}>
    //   {/* <Typography variant="h4" sx={{ color: ORANGE_COLOR, marginBottom: '16px' }}>
    //     Pond Inspection Quality Package
    //   </Typography> */}

    //   {/* <Typography variant="h6" sx={{ marginBottom: '12px' }}>
    //     Estimate time: 1 - 1.5 hours
    //   </Typography> */}

    //   <Typography variant="h6" sx={{ marginBottom: '12px' }}>
    //     Implementation Process:
    //   </Typography>
    //   <ul>
    //     <li><Typography variant="body1">Step 1: Schedule Appointment - Book an appointment online or by phone, providing pond details.</Typography></li>
    //     <li><Typography variant="body1">Step 2: Preparation - Veterinarian prepares necessary equipment like water testing kits.</Typography></li>
    //     <li><Typography variant="body1">Step 3: On-site Inspection - Vet inspects the pond’s structure, cleanliness, and water condition.</Typography></li>
    //     <li><Typography variant="body1">Step 4: Water Quality Testing - Check pH, ammonia, nitrate levels, and oxygenation.</Typography></li>
    //     <li><Typography variant="body1">Step 5: Pond Health Assessment - Evaluate the ecosystem, filtration, and potential risks.</Typography></li>
    //     <li><Typography variant="body1">Step 6: Consultation - Provide recommendations for improving pond quality.</Typography></li>
    //     <li><Typography variant="body1">Step 7: Detailed Report - Receive a report with observations and improvement tips.</Typography></li>
    //   </ul>

    //   <Typography variant="h6" sx={{ marginTop: '20px', marginBottom: '12px' }}>
    //     Categories of Inspection:
    //   </Typography>
    //   <ul>
    //     <li><Typography variant="body1">Water Quality Check - pH, ammonia, and nitrates analysis.</Typography></li>
    //     <li><Typography variant="body1">Filtration System Review - Assess performance of pond filters and oxygenation systems.</Typography></li>
    //     <li><Typography variant="body1">Pond Ecosystem Health - Ensure the environment is safe for Koi fish.</Typography></li>
    //     <li><Typography variant="body1">Maintenance Recommendations - Suggestions for improving water quality and pond care.</Typography></li>
    //     <li><Typography variant="body1">Post-Inspection Support - Follow-up guidance for sustaining pond health.</Typography></li>
    //   </ul>

    //   {/* <Button variant="contained" color="primary" sx={{ marginTop: '20px' }}>
    //     Schedule Inspection
    //   </Button> */}
    // </Box>
  );
}

export default Content;
