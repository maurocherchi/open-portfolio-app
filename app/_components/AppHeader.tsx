'use client';

import {Menubar} from "primereact/menubar";
import {useRouter, usePathname} from "next/navigation";
import {Button} from "primereact/button";

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

    const menuBarStartTemplate = () => {
        return <h3>My portfolio app</h3>;
    }

    const menuBarEndTemplate = () => {
        const navLinks = calcNavLinks(pathName);
        return <div>
            {navLinks.map((link) => {
                return <Button key={link.href} label={link.label} onClick={() => {
                    router.push(link.href)
                }}/>
            })}
        </div>;
    }

    return (
        <Menubar start={menuBarStartTemplate} end={menuBarEndTemplate} model={[]}/>
    )
}