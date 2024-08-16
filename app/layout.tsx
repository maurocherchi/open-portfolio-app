import type {Metadata} from "next";
import {Inter} from "next/font/google";
import AppHeader from "@/app/_components/AppHeader";

import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Open Portfolio App",
    description: "A simple opensource portfolio App.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AppHeader/>
        {children}
        </body>
        </html>
    );
}
