'use client';

import {useEffect, useState} from 'react';
import {Transition} from '@headlessui/react';
import {CheckCircleIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {XMarkIcon as XMarkIcon20} from '@heroicons/react/20/solid'
import {useNotifications, useNotificationsDispatch} from "@/app/_context/NotificationContext";

export default function NotificationsRegion() {
    const notifications = useNotifications();
    const dispatchNotification = useNotificationsDispatch();

    return (
        <div
            aria-live="assertive"
            className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
            <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                {notifications.map((notification) => (
                    <NotificationElement
                        key={notification.id}
                        title={notification.title}
                        message={notification.message}
                        type={notification.type}
                        onClose={() => {
                            dispatchNotification({
                                type: 'remove',
                                notification: notification
                            });
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

interface NotificationElementProps {
    key: any,
    title: string,
    message: string,
    type: string,
    onClose: () => void
}

function NotificationElement({
    title,
    message,
    type,
    onClose
}: NotificationElementProps) {
    const [show, setShow] = useState(true);
    const Icon = type === 'success' ? CheckCircleIcon : XMarkIcon;
    const textColor = type === 'success' ? 'text-green-400' : 'text-red-400';
    const ringColor = type === 'success' ? 'ring-green-400' : 'ring-red-400';

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
            onClose();
        }, 5000);
    }, [onClose]);

    return (
        <Transition show={show}>
            <div
                className={"pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 " + ringColor + " ring-opacity-50 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0"}>
                <div className="p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <Icon aria-hidden="true" className={"h-6 w-6 " + textColor}/>
                        </div>
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                            <p className="text-sm font-medium text-gray-900">{title}</p>
                            <p className="mt-1 text-sm text-gray-500">{message}</p>
                        </div>
                        <div className="ml-4 flex flex-shrink-0">
                            <button
                                type="button"
                                onClick={() => {
                                    setShow(false);
                                    onClose();
                                }}
                                className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon20 aria-hidden="true" className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    )
}
