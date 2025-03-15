"use client";

import { useEffect, useRef } from "react";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import { SessionProvider } from "next-auth/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { usePathname } from "next/navigation";

import "./globals.css";

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({ children }) {
    const ellipse1 = useRef();
    const ellipse2 = useRef();

    const pathname = usePathname();
    const noLayoutRoutes = ["/login", "/register", "/admin"];

    useEffect(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
        }).to([ellipse1.current, ellipse2.current], {
            x: "0%",
            y: (index) => (index === 0 ? "75vh" : "-75vh"),
            ease: "none",
        });
    }, []);

    if (noLayoutRoutes.includes(pathname)) {
        return (
            <html lang="es">
                <body>
                    <SessionProvider>
                        <div className="flex flex-col min-h-screen gap-10 z-10">
                            <main className="flex-1">{children}</main>
                        </div>
                    </SessionProvider>
                </body>
            </html>
        );
    }

    return (
        <html lang="es">
            <body>
                {/* Contenedor de las elipses animadas */}
                <div className="fixed inset-0 z-[-2] bg-slate-950/40">
                    <div
                        ref={ellipse1}
                        className="absolute top-[0%] right-[0%] w-[90px] aspect-[2/3] bg-slate-100 blur-[200px] rounded-full"
                    ></div>
                    <div
                        ref={ellipse2}
                        className="absolute bottom-[0%] left-[0%] w-[90px] aspect-[2/3] bg-slate-100 blur-[200px] rounded-full"
                    ></div>
                </div>

                <SessionProvider>
                    <div className="flex flex-col min-h-screen gap-10 z-10">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </SessionProvider>
            </body>
        </html>
    );
}
