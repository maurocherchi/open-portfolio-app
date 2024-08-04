import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {PrimeReactProvider} from 'primereact/api';
import "primereact/resources/themes/md-light-indigo/theme.css";
import AppHeader from "@/app/_components/AppHeader";

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
        <PrimeReactProvider>
            <AppHeader/>
            {children}
        </PrimeReactProvider>
        </body>
        </html>
    );
}
