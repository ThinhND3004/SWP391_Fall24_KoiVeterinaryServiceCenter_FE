import { Typography } from "@mui/material";

export default function Label({ label }){
    return <Typography sx={{ fontWeight: 600, fontSize: 18, marginRight: '10px' }}>{label}:</Typography>
}