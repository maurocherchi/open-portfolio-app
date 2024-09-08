"use client";

import React, {createContext, Dispatch, useContext, useReducer} from "react";

interface Notification {
    id: number,
    title: string,
    message: string
    type: 'success' | 'error'
}

interface NotificationAction {
    type: 'add' | 'remove',
    notification: Notification
}

export const NotifCtx = createContext<Notification[]>([]);
export const NotifDispatchCtx = createContext<Dispatch<NotificationAction>>(() => {});

export function useNotifications() {
    return useContext(NotifCtx);
}

export function useNotificationsDispatch() {
    return useContext(NotifDispatchCtx);
}

export default function NotificationsProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [notifications, dispatch] = useReducer(
        notificationsReducer,
        []
    );

    return (
        <NotifCtx.Provider value={notifications}>
            <NotifDispatchCtx.Provider value={dispatch}>
                {children}
            </NotifDispatchCtx.Provider>
        </NotifCtx.Provider>
    );
}

function notificationsReducer(notifications: Notification[], action: NotificationAction) {
    switch (action.type) {
        case 'add': {
            return [...notifications, action.notification];
        }
        case 'remove': {
            return notifications.filter(
                (notification) => notification.id !== action.notification.id
            );
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
