import React, { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Alert, Box, Snackbar } from '@mui/material';

const NotificationHandler = () => {
    const [notifications, setNotifications] = useState([]);
    const [accountId, setAccountId] = useState('');
    const [description, setDescription] = useState('');
    const clientRef = useRef(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
            onConnect: () => {
                console.log('Connected to WebSocket');
                client.subscribe('/topic/notifications', (message) => {
                    const notification = JSON.parse(message.body);
                    console.log("Received notification: ", notification.data);

                    const { account, description, createdAt } = notification.data;
                    setNotifications((prev) => [
                        ...prev,
                        { account, description, createdAt }
                    ]);
                });
            },
            onDisconnect: () => console.log('Disconnected from WebSocket'),
            onStompError: (frame) => console.error('Broker error: ' + frame.headers['message']),
        });

        clientRef.current = client;
        client.activate();

        return () => {
            if (clientRef.current) {
                clientRef.current.deactivate();
            }
        };
    }, []);

    const sendNotification = async () => {
        const client = clientRef.current;
        if (client && client.connected) {
            try {
                client.publish({
                    destination: '/app/send',
                    body: JSON.stringify({ accountId, description }),
                });

                setAccountId('');
                setDescription('');
            } catch (error) {
                console.error('Error sending notification:', error);
            }
        } else {
            console.error('Client not connected');
        }
    };

    const handleClose = (
        event,
        reason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    // return (
    //     <Box>
    //         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    //             <Alert
    //                 onClose={handleClose}
    //                 severity="success"
    //                 variant="filled"
    //                 sx={{ width: '100%' }}
    //             >
    //                 This is a success Alert inside a Snackbar!
    //             </Alert>
    //         </Snackbar>

    //         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    //             <Alert
    //                 onClose={handleClose}
    //                 severity="success"
    //                 variant="filled"
    //                 sx={{ width: '100%' }}
    //             >
    //                 This is a success Alert inside a Snackbar!
    //             </Alert>
    //         </Snackbar>
    //     </Box>

    // )

    // return (
    //     <div>
    //         <h2>Send Notification</h2>
    //         <input
    //             type="text"
    //             value={accountId}
    //             onChange={(e) => setAccountId(e.target.value)}
    //             placeholder="Enter account ID"
    //         />
    //         <input
    //             type="text"
    //             value={description}
    //             onChange={(e) => setDescription(e.target.value)}
    //             placeholder="Enter notification message"
    //         />
    //         <button onClick={sendNotification}>Send Notification</button>

    //         <h2>Received Notifications</h2>
    //         <ul>
    //             {notifications.map((notification, index) => (
    //                 <li key={index}>
    //                     {/* <strong>Account ID:</strong> {notification.account.id} <br /> //receiver// */} 
    //                     <strong>Description:</strong> {notification.description} <br />
    //                     <strong>Created At:</strong> {new Date(notification.createdAt).toLocaleString()}
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );
};

export default NotificationHandler;
