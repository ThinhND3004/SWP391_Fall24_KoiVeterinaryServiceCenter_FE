import { Box, Typography } from '@mui/material'
import { OFFLINE_BUTTON, ONLINE_BUTTON, ORANGE_COLOR } from '~/theme'

function MeetingMethodTag({ meetingMethod, backgroundColor }) {
    return (
        <Typography
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: backgroundColor,
                color: "white",
                padding: "10px",
                borderRadius: "10px",
                height: "30px",
                whiteSpace: "nowrap"
            }}
        >
            {meetingMethod.replace(/_/g, " ")}
        </Typography>)
}

function MeetingMethodTagHolder({ meetingMethod, serviceType }) {

    let meetingMethodTags;
    if (meetingMethod === 'ALL') {
        meetingMethodTags = (
            <>
                <MeetingMethodTag meetingMethod={'ONLINE'} backgroundColor={ONLINE_BUTTON} />
                <MeetingMethodTag meetingMethod={'OFFLINE_HOME'} backgroundColor={OFFLINE_BUTTON} />
                <MeetingMethodTag meetingMethod={'OFFLINE_CENTER'} backgroundColor={OFFLINE_BUTTON} />
            </>
        )
    }
    else if (meetingMethod === 'OFFLINE') {
        meetingMethodTags = (
            <>
                <MeetingMethodTag meetingMethod={'OFFLINE_HOME'} backgroundColor={OFFLINE_BUTTON} />
                <MeetingMethodTag meetingMethod={'OFFLINE_CENTER'} backgroundColor={OFFLINE_BUTTON} />
            </>
        )
    }
    else {
        const backgroundColor = meetingMethod === 'ONLINE' ? ONLINE_BUTTON : OFFLINE_BUTTON;
        meetingMethodTags = (
            <>
                <MeetingMethodTag meetingMethod={meetingMethod} backgroundColor={backgroundColor} />
            </>
        )
    }

    return (
        <Box
            padding={"20px 0px"}
            display={"flex"}
            flexDirection={"row"}
            width={500}
            height={50}
            gap={2}
        >
            {meetingMethodTags}
            : 
                <MeetingMethodTag meetingMethod={serviceType} backgroundColor={ORANGE_COLOR} />
        </Box>
    )
}

export default MeetingMethodTagHolder;