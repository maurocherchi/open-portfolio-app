'use client';

import AppHeader, {NavButton} from "@/app/_components/AppHeader";

const navButtons: NavButton[] = [
    {label: 'Manage Portfolio', href: '/manage-portfolio'},
];

export default function Home() {
    return (
        <>
            <AppHeader navButtons={navButtons}/>
            <main>
                <h1>Home</h1>
            </main>
        </>
    );
}
