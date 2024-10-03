import { Box } from "@mui/material";
const text = 'rgb(22, 21, 21)';

function TimeBlock({ backgroundColor, title, borderBottom }) {
    return (
        <Box
            id={title}
            sx={{
                width: '100%',
                height: 'calc(20px + 0.22vw)',
                backgroundColor: backgroundColor,
                borderLeft: `1px solid ${text}`,
                borderRight: `1px solid ${text}`,
                borderBottom: `1px ${borderBottom} ${text}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                userSelect: 'none',
                WebkitUserDrag: 'none',
            }}
            title={title} 
        >
        </Box>
    )
}

export default TimeBlock