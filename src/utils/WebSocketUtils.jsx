// notificationUtils.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let client;

export const initializeWebSocket = ({ handleConnect }) => {
    const socket = new SockJS('http://localhost:8089/ws');
    client = new Client({
        webSocketFactory: () => socket,
        debug: (str) => console.log(str),
        onConnect: () => {
            console.log('Connected to WebSocket')
            handleConnect(client);
        },
        onDisconnect: () => console.log('Disconnected from WebSocket'),
        onStompError: (frame) => console.error('Broker error: ' + frame.headers['message']),
    });
    client.activate();

    return client;
};

export const sendNotification = async ({ accountEmail, bookingId, title, description, type }) => {
    if (client && client.connected) {
        try {
            const token = localStorage.getItem('token')?.replaceAll('"', '');
            console.log(accountEmail + " " + token)
            client.publish({
                destination: '/app/send',
                body: JSON.stringify({ accountEmail,token, bookingId, title, description, type }),
            });

        } catch (error) {
            console.error('Error sending notification: ', error);
        }
    } else {
        console.error('Client not connected');
    }
};

export const sendNotificationOnEmail = async ({ accountEmail, bookingId, title, description, type }) => {
    if (client && client.connected) {
        try {
            const token = localStorage.getItem('token')?.replaceAll('"', '')
            client.publish({
                destination: '/app/send-email',
                body: JSON.stringify({ accountEmail, token, bookingId, title, description, type }),
            });

        } catch (error) {
            console.error('Error sending notification: ', error);
        }
    } else {
        console.error('Client not connected');
    }
};
