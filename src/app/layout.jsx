"use client";

import Header from "@/layout/header";
import Footer from "@/layout/footer";

import "./globals.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>
                <SessionProvider>
                    <div className="flex flex-col min-h-screen gap-10">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </SessionProvider>
            </body>
        </html>
    );
}
