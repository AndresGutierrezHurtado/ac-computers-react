"use client";
import Modelo3D from "@/components/model";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const mainref = useRef();
    const sceneRef = useRef();

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: mainref.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                onUpdate: (self) => {
                    setProgress(self.progress);
                },
            },
        })
            .to(sceneRef.current, {
                x: "-30%",
                ease: "none",
            })
            .to(sceneRef.current, {
                x: "8%",
                ease: "none",
            })
            .to(sceneRef.current, {
                x: "-30%",
                ease: "none",
            });

    }, []);

    return (
        <main className="w-full min-h-screen flex flex-col gap-10" ref={mainref}>
            <div className="fixed top-[2.5%] left-[15%] h-screen w-screen" ref={sceneRef}>
                <Modelo3D progress={progress} />
            </div>
            <section className="w-full px-3 h-[90vh] bg-black/10">
                <div className="w-full max-w-[1200px] mx-auto">
                    <h1 className="text-5xl font-extrabold">Bienvenido!</h1>
                </div>
            </section>
            <section className="w-full px-3 h-[90vh] bg-black/10">
                <div className="w-full max-w-[1200px] mx-auto">
                    <h1 className="text-5xl font-extrabold">Bienvenido!</h1>
                </div>
            </section>
            <section className="w-full px-3 h-[90vh] bg-black/10">
                <div className="w-full max-w-[1200px] mx-auto">
                    <h1 className="text-5xl font-extrabold">Bienvenido!</h1>
                </div>
            </section>
            <section className="w-full px-3 h-[90vh] bg-black/10">
                <div className="w-full max-w-[1200px] mx-auto">
                    <h1 className="text-5xl font-extrabold">Bienvenido!</h1>
                </div>
            </section>
        </main>
    );
}
