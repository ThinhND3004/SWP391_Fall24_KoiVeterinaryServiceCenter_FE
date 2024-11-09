// notificationUtils.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import api from "~/config/axios";

let client;

export const initializeWebSocket = ({ handleConnect }) => {
    const socket = new SockJS(api.defaults.baseURL + '/ws');
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
            client.publish({
                destination: '/app/send',
                body: JSON.stringify({ accountEmail, bookingId, title, description, type }),
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
            client.publish({
                destination: '/app/send-email',
                body: JSON.stringify({ accountEmail, bookingId, title, description, type }),
            });

        } catch (error) {
            console.error('Error sending notification: ', error);
        }
    } else {
        console.error('Client not connected');
    }
};
