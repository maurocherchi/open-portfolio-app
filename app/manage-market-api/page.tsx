"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {loadApiKey, resetApiKey, storeApiKey} from "@/app/_repositories/AppConfigRepo";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import {testApiKey} from "@/app/_service/FmpService";
import {useNotificationsDispatch} from "@/app/_context/NotificationContext";

export default function ManageApi() {
    const [apiKeyExists, setApiKeyExists] = useState(false);
    const [apiKey, setApiKey] = useState<string>("");
    const [showApiKey, setShowApiKey] = useState<boolean>(false);
    const hiddenApiKey = apiKey ? apiKey.replace(/./g, '*') : "";
    const dispatchNotification = useNotificationsDispatch();

    useEffect(() => {
        (async () => {
            try {
                const loadedApiKey = await loadApiKey();
                if (loadedApiKey) {
                    setApiKeyExists(true);
                    setApiKey(loadedApiKey);
                    setShowApiKey(false);
                } else {
                    setShowApiKey(true);
                }
            } catch (error) {
                console.error("Error loading API key:", error);
                dispatchNotification({
                    type: "add",
                    notification: {
                        id: Date.now(),
                        title: "Error loading API key",
                        message: "Please try again later",
                        type: "error"
                    }
                });
            }
        })();
    }, [dispatchNotification]);

    function handleSaveClick() {
        if (apiKey)
            storeApiKey(apiKey)
                .then(() => {
                    dispatchNotification({
                        type: "add",
                        notification: {
                            id: Date.now(),
                            title: "API key saved",
                            message: "API key saved successfully",
                            type: "success"
                        }
                    });
                })
                .catch(() => {
                    dispatchNotification({
                        type: "add",
                        notification: {
                            id: Date.now(),
                            title: "Error storing API key",
                            message: "Please try again later",
                            type: "error"
                        }
                    });
                });
        else
            dispatchNotification({
                type: "add",
                notification: {
                    id: Date.now(),
                    title: "API key is empty",
                    message: "Please enter a valid API key",
                    type: "error"
                }
            })
    }

    async function handleTestClick() {
        if (apiKey) {
            const testResult = await testApiKey(apiKey);
            switch (testResult) {
                case "valid":
                    dispatchNotification({
                        type: "add",
                        notification: {
                            id: Date.now(),
                            title: "API key is valid",
                            message: "API key is valid",
                            type: "success"
                        }
                    });
                    break;
                case "invalid":
                    dispatchNotification({
                        type: "add",
                        notification: {
                            id: Date.now(),
                            title: "API key is invalid",
                            message: "API key is invalid",
                            type: "error"
                        }
                    });
                    break;
            }
        } else {
            dispatchNotification({
                type: "add",
                notification: {
                    id: Date.now(),
                    title: "API key is empty",
                    message: "Please enter a valid API key",
                    type: "error"
                }
            })
        }
    }

    function handleResetClick() {
        resetApiKey()
            .then(() => {
                dispatchNotification({
                    type: "add",
                    notification: {
                        id: Date.now(),
                        title: "API key reset",
                        message: "API key reset successfully",
                        type: "success"
                    }
                });
            })
            .catch(() => {
                dispatchNotification({
                    type: "add",
                    notification: {
                        id: Date.now(),
                        title: "Error resetting API key",
                        message: "Please try again later",
                        type: "error"
                    }
                });
            });
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Market API connection
                            parameters</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            The only API provider supported is <Link
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            href="https://site.financialmodelingprep.com/">
                            https://site.financialmodelingprep.com/</Link>.
                        </p>
                        {!apiKeyExists &&
                            <div>
                                <p className="mt-1 text-sm text-gray-600">You can create an account and get a free API
                                    Key.</p>
                                <p className="text-xs leading-8 text-gray-400">Limitations apply, see pricing
                                    models <Link
                                        className="text-blue-600 hover:underline"
                                        target="_blank"
                                        href="https://site.financialmodelingprep.com/developer/docs/pricing">here</Link>.
                                </p>
                            </div>
                        }

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    API Key
                                </label>
                                <div className="mt-2">
                                    <div
                                        className="flex px-2 items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            id="key"
                                            name="key"
                                            type="text"
                                            value={showApiKey ? apiKey : hiddenApiKey}
                                            onChange={(e) => setApiKey(e.target.value)}
                                            disabled={!showApiKey}
                                            placeholder="Enter your API Key here"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                        {apiKeyExists && !showApiKey && <EyeIcon className="h-5 w-5 cursor-pointer"
                                                                                 onClick={() => setShowApiKey(true)}/>}
                                        {apiKeyExists && showApiKey && <EyeSlashIcon className="h-5 w-5 cursor-pointer"
                                                                                     onClick={() => setShowApiKey(false)}/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    onClick={handleResetClick}
                    className="text-sm font-semibold leading-6 text-gray-900">
                    Reset
                </button>
                <button
                    type="button"
                    onClick={handleTestClick}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Test Key
                </button>
                <button
                    type="submit"
                    onClick={handleSaveClick}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {apiKeyExists ? "Update Key" : "Save Key"}
                </button>
            </div>
        </div>
    )
}