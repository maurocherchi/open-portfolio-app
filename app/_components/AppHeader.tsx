"use client";

import {Cog6ToothIcon, HomeIcon} from "@heroicons/react/24/outline";
import {usePathname, useRouter} from "next/navigation";
import React from "react";

export interface NavLink {
    label: string;
    icon: React.ElementType;
    href: string;
}

function calcNavLinks(pathName: string): NavLink[] {
    switch (pathName) {
        case "/":
            return [
                {label: "Manage Portfolio", icon: Cog6ToothIcon, href: "/manage-portfolio"}
            ]
        case "/manage-portfolio":
            return [
                {label: "Home", icon: HomeIcon, href: "/"}
            ]
        default:
            return [];
    }
}

export default function AppHeader() {
    const router = useRouter();
    const pathName = usePathname();

    return (
        <div className="bg-blue-500">
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-xl font-bold leading-7 text-white sm:truncate sm:text-2xl sm:tracking-tight">
                            Open portfolio App
                        </h2>
                    </div>
                    <div className="flex md:ml-4 md:mt-0">
                        {calcNavLinks(pathName).map((link) => {
                            const Icon = link.icon;
                            return <button
                                key={link.href}
                                type="button"
                                aria-label={link.label}
                                className="pl-3 py-2"
                                onClick={() => router.push(link.href)}
                            >
                                <Icon className="text-white size-6 stroke-1.5" aria-hidden="true"/>
                            </button>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
