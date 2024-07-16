'use client';

import AppHeader, {NavButton} from "@/app/_components/AppHeader";

const navButtons: NavButton[] = [
    {label: 'Home', href: '/'},
];

export default function ManagePortfolio() {
    return (
        <>
            <AppHeader navButtons={navButtons}/>
            <main>
                <h1>Manage Portfolio</h1>
            </main>
        </>
    )
}