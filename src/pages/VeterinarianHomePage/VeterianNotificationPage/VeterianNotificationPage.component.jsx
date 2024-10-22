import { Box, Typography } from "@mui/material";
import NotificationItem from "./VeterianNotification";
const notifications = [
    {
        id: 1,
        title: "Update Available",
        description: "A new software update is available. Would you like to install it?",
    },
    {
        id: 2,
        title: "Subscription Expiring",
        description: "Your subscription is expiring soon. Would you like to renew?",
    },
    {
        id: 3,
        title: "Backup Reminder",
        description: "You haven't backed up your files in a while. Do you want to back them up now?",
    },
];
function VeterianNotificationPage() {
    const handleYes = (id) => {
        console.log(`Yes clicked for notification ID: ${id}`);
        // Additional logic for "Yes"
    };

    const handleNo = (id) => {
        console.log(`No clicked for notification ID: ${id}`);
        // Additional logic for "No"
    };

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', width: '80%', marginLeft: '250px',
        }}>
            <Typography variant="h4" gutterBottom>
                Notifications
            </Typography>
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    title={notification.title}
                    description={notification.description}
                    onYes={() => handleYes(notification.id)}
                    onNo={() => handleNo(notification.id)}
                />
            ))}
        </Box>
    );
}
export default VeterianNotificationPage