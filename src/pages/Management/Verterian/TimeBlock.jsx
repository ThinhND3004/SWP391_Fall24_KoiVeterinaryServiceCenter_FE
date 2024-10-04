import { Box } from "@mui/material";
import { DARK_GREEN, LIGHT_PINK } from "~/theme";
const text = 'rgb(22, 21, 21)';

function TimeBlock({ id, isSelected, borderBottom }) {
    return (
        <Box
            id={id}
            className={isSelected ? 'selected' : ''}
            sx={{
                width: '100%',
                height: 'calc(20px + 0.22vw)',
                backgroundColor: isSelected ? DARK_GREEN : LIGHT_PINK,
                borderLeft: `1px solid ${text}`,
                borderRight: `1px solid ${text}`,
                borderBottom: `1px ${borderBottom} ${text}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                userSelect: 'none',
                WebkitUserDrag: 'none',
            }}
        >
        </Box>
    )
}

export default TimeBlock