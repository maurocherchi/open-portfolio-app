"use client";

import {Cog6ToothIcon, HomeIcon} from "@heroicons/react/24/outline";
import {usePathname, useRouter} from "next/navigation";
import React from "react";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import Link from "next/link";

export interface NavLink {
    label: string;
    icon: React.ElementType;
    href: string;
}

export default function AppHeader() {
    const router = useRouter();
    const pathName = usePathname();

    const navLinks = ((): NavLink[] => {
        switch (pathName) {
            case "/":
                return [
                    {label: "Manage Portfolio", icon: Cog6ToothIcon, href: "/manage-portfolio"},
                    {label: "Manage Market API", icon: HomeIcon, href: "/manage-market-api"},
                ];
            case "/manage-portfolio":
                return [
                    {label: "Manage Market API", icon: HomeIcon, href: "/manage-market-api"}
                ];
            case "/manage-market-api":
                return [
                    {label: "Manage Portfolio", icon: Cog6ToothIcon, href: "/manage-portfolio"}
                ];
            default:
                return [];
        }
    })();

    return (
        <div className="bg-blue-500">
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-xl font-bold leading-7 text-white sm:truncate sm:text-2xl sm:tracking-tight">
                            Open portfolio App
                        </h2>
                    </div>
                    <div className="flex flex-row items-center gap-x-4">
                        {pathName !== "/" &&
                            <button
                                type="button"
                                aria-label="Home"
                                onClick={() => router.push("/")}
                            >
                                <HomeIcon className="text-white size-6 stroke-1.5" aria-hidden="true"/>
                            </button>
                        }
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton className="align-middle">
                                <Cog6ToothIcon className="text-white size-6 stroke-1.5" aria-hidden="true"/>
                            </MenuButton>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1">
                                    {navLinks.map((link) => {
                                        return (
                                            <MenuItem key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                                >
                                                    {link.label}
                                                </Link>
                                            </MenuItem>
                                        );
                                    })}
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>

                </div>
            </div>
        </div>
    )
}
