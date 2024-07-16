'use client';

import Link from 'next/link';

export interface NavButton {
    label: string;
    href: string;
}

export interface AppHeaderParams {
    navButtons: NavButton[];
}

export default function AppHeader({navButtons}: AppHeaderParams) {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-200">
            <h1 className="text-2xl text-white font-bold">My App</h1>
            <nav className="flex gap-4">
                {navButtons.map((button, index) => (
                    <Link key={index} href={button.href}>
                        <button
                            className="bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded">{button.label}
                        </button>
                    </Link>
                ))}
            </nav>
        </div>
    )
}