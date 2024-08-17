import type {Metadata} from "next";
import {Inter} from "next/font/google";
import AppHeader from "@/app/_components/AppHeader";

import "./globals.css";
import AppFooter from "@/app/_components/AppFooter";

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
        <div className="min-h-screen">
            {children}
        </div>
        <AppFooter/>
        </body>
        </html>
    );
}
