/* eslint-disable indent */
import { Box, Breadcrumbs, Typography } from "@mui/material"
import NotificationItem from "./VeterianNotification"
import { useEffect, useState } from "react";
import ManagementApi from "~/api/ManagementApi";

// const notifications = [
//     {
//         id: 1,
//         title: "Update Available",
//         description: "A new software update is available. Would you like to install it?",
//     },
//     {
//         id: 2,
//         title: "Subscription Expiring",
//         description: "Your subscription is expiring soon. Would you like to renew?",
//     },
//     {
//         id: 3,
//         title: "Backup Reminder",
//         description: "You haven't backed up your files in a while. Do you want to back them up now?",
//     },
// ];
function VeterianNotificationPage() {
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        const data = await ManagementApi.getCurrentNotifications();
        setNotifications(data);
    }

    useEffect(() => {
        fetchNotifications();
    }, [])


    const handleYes = async (notification) => {
        const result = await ManagementApi.assignVeterianToBooking({
            bookingId: notification.bookingId,
            veterianEmail: notification.accountEmail
        })
        if(result){
            // rerender notifications
        }
    };

    const handleNo = async (id) => {
        const result = await ManagementApi.deleteNotificationById(id);
        if(result) console.log(`No clicked for notification ID: ${id}`);
        // Additional logic for "No"
    };

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column'
        }}>
            <Box sx={{ mb: 2 }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
                        Admin
                    </Typography>
                    <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
                        Notifications
                    </Typography>
                </Breadcrumbs>
            </Box>
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    title={notification.title}
                    description={notification.description}
                    type={notification.type}
                    onYes={() => handleYes(notification)}
                    onNo={() => handleNo(notification.id)}
                />
            ))}
        </Box>
    );
}
export default VeterianNotificationPage