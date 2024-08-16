"use client";

import {useRouter, usePathname} from "next/navigation";

export interface NavLink {
    label: string;
    href: string;
}

function calcNavLinks(pathName: string): NavLink[] {
    switch (pathName) {
        case "/":
            return [
                {label: "Manage Portfolio", href: "/manage-portfolio"}
            ]
        case "/manage-portfolio":
            return [
                {label: "Home", href: "/"}
            ]
        default:
            return [];
    }
}

export default function AppHeader() {
    const router = useRouter();
    const pathName = usePathname();

    return (
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8 bg-blue-500">
            <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-100 sm:truncate sm:text-3xl sm:tracking-tight">
                        Open portfolio App
                    </h2>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    {calcNavLinks(pathName).map((link) => (
                        <button
                            key={link.href}
                            type="button"
                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={() => router.push(link.href)}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
