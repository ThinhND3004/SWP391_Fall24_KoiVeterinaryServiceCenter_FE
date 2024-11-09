/* eslint-disable indent */
import { Box, Breadcrumbs, Typography } from "@mui/material"
import NotificationItem from "./VeterianNotification"
import { useEffect, useState } from "react";
import ManagementApi from "~/api/ManagementApi";
import { sendNotification } from "~/utils/WebSocketUtils";

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
        console.log("BOOKING ID: ",notification)
        const result = await ManagementApi.assignVeterianToBooking({
            bookingId: notification.bookingId,
            veterianEmail: notification.accountEmail
        })
        if(result){
            // remove notification
            console.log('Remove noti')
            setNotifications(prevNotifications =>
                prevNotifications.filter(n => n.id !== notification.id)
            );
            sendNotification({
                title: 'Accept Invitation',
                description: `${notification.accountFullName} have accepted your invitation!`,
                type: 'DEFAULT'
            })
        }
    };

    const handleNo = async (notification) => {
        const result = await ManagementApi.deleteNotificationById(notification.id);
        if(result) {
            console.log('Remove noti')
            setNotifications(prevNotifications =>
                prevNotifications.filter(n => n.id !== notification.id)
            );
            sendNotification({
                title: 'Reject Invitation',
                description: `${notification.accountFullName} had rejected your invitation!`,
                type: 'DEFAULT'
            })
        }
        
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
                console.log("Notification: ", notification),
                <NotificationItem
                    key={notification.id}
                    title={notification.title}
                    description={notification.description}
                    type={notification.type}
                    onYes={() => handleYes(notification)}
                    onNo={() => handleNo(notification)}
                />
            ))}
        </Box>
    );
}
export default VeterianNotificationPage