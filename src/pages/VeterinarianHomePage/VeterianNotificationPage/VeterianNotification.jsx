import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { INPUT_FIELD_COLOR, ORANGE_COLOR } from "~/theme";


function NotificationItem({ title, description, type, onYes, onNo }) {
  return (
    <Box
      sx={{
        // border: "1px solid #ccc",
        borderRadius: '14px',
        padding: '16px',
        marginBottom: '16px',
        backgroundColor: INPUT_FIELD_COLOR,
        height: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography gutterBottom sx={{ fontWeight: 700, fontSize: '20px' }}>
        {title}
      </Typography>
      <Typography sx={{ fontWeight: 400, fontSize: '16px' }}>
        {description}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        {type === 'YESNO' ?
          (
            <>
              <Button variant="contained" onClick={onYes} sx={{ bgcolor: '#49be25', borderRadius: '10px', boxShadow: 'none', width: '70px', border: 'none', color: '#fff' }}>
                Yes
              </Button>
              <Button variant="contained" onClick={onNo} sx={{ bgcolor: ORANGE_COLOR, borderRadius: '10px', boxShadow: 'none', width: '70px', border: 'none', color: '#fff' }}>
                No
              </Button></>
          )
          :
          (
            <>
              <Button variant="contained" onClick={onNo} sx={{ bgcolor: ORANGE_COLOR, borderRadius: '10px', boxShadow: 'none', width: '70px', border: 'none', color: '#fff' }}>
                Delete
              </Button>
            </>
          )
        }

      </Stack>
    </Box >
  );
}
export default NotificationItem