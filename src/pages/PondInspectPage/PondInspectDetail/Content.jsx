import React from "react";
import { Typography } from "@mui/material";

function Content({ service }) {
  return (
    <div>
      {service && (
        <div>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 2,
            }}
          >
            {service.description}
          </Typography>

          {service.isDisable && (
            <Typography sx={{ color: "red" }}>
              This service is currently unavailable.
            </Typography>
          )}
        </div>
      )}
    </div>
  );
}

export default Content;
