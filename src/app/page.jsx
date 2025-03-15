"use client";
import { DownloadIcon, GearIcon, UsersIcon } from "@/components/icons";
import Modelo3D from "@/components/model";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";
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
                x: "-40%",
                ease: "none",
            })
            .to(sceneRef.current, {
                x: "8%",
                ease: "none",
            })
            .to(sceneRef.current, {
                x: "-40%",
                ease: "none",
            });
    }, []);

    return (
        <main className="w-full min-h-screen flex flex-col gap-[100px] lg:gap-10 " ref={mainref}>
            <div
                className="fixed top-[2.5%] right-[-20%] h-screen w-screen hidden lg:block pointer-events-none z-40"
                ref={sceneRef}
            >
                <Modelo3D progress={progress} />
            </div>

            {/* Hero section */}
            <section className="w-full px-3 mt-[150px] lg:mt-0">
                <div className="w-full h-auto lg:h-[90vh] max-w-[1200px] mx-auto flex items-center">
                    <article className="w-full lg:w-1/2 flex flex-col gap-2">
                        <div className="badge bg-[#4e99d3]/20 text text-[#4e99d3] font-medium border border-[#4e99d3]/50 mb-1">
                            <GearIcon size={12} /> Lo mejor de la tecnologia
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold">
                            AC <span className="text-[#4e99d3] italic">COMPUTERS</span>
                        </h1>
                        <p className="text-xl mb-6">
                            Donde la <span className="text-[#4e99d3]">tecnologia</span> te acompaña.
                        </p>
                        <p className="text-pretty w-full text-gray-300 text-lg mb-8">
                            Creemos que la tecnologia es el futuro y no tiene porque costar una
                            fortuna. Descubre nuestra collecion de computadoras y componentes a
                            precios que se adaptan a tu estilo de vida.
                        </p>
                        <button className="btn bg-[#4e99d3] hover:bg-[#4e99d3]/80 w-fit text-black rounded-lg mb-3 font-medium">
                            <DownloadIcon size={18} />
                            Descargar Catalogo
                        </button>
                        <p className="flex items-center gap-1 font-medium text-gray-300">
                            <span className="text-[#4e99d3] flex items-center">
                                + <UsersIcon size={20} className="mr-2" /> 1000
                            </span>{" "}
                            clientes satisfechos
                        </p>
                    </article>
                </div>
            </section>

            {/* Second section */}
            <section className="w-full px-3">
                <div className="w-full h-auto lg:h-[90vh] max-w-[1200px] mx-auto flex items-center">
                    <article className="w-3/5 hidden lg:block"></article>
                    <article className="w-full lg:w-3/5 flex flex-col gap-4">
                        <div>
                            <p className="text-[#4e99d3] font-bold tracking-tight uppercase">
                                Los mejores
                            </p>
                            <h1 className="text-5xl font-extrabold">Componentes</h1>
                        </div>
                        <p className="text-pretty w-full text-gray-300 text-lg mb-4">
                            Descubre nuestra amplia selección de componentes de la más alta calidad, 
                            que abarca desde avanzadas placas base hasta veloces discos duros, 
                            potentes tarjetas gráficas y memorias RAM de gran capacidad.
                        </p>
                        <Link href="/components">
                            <button className="btn bg-[#4e99d3] hover:bg-[#4e99d3]/80 w-fit text-black rounded-lg font-medium">
                                Ver Componentes
                            </button>
                        </Link>
                    </article>
                </div>
            </section>

            {/* Third section */}
            <section className="w-full px-3">
                <div className="w-full h-auto lg:h-[90vh] max-w-[1200px] mx-auto flex items-center">
                    <article className="w-full lg:max-w-1/2 flex flex-col gap-2">
                        <div>
                            <p className="text-[#4e99d3] font-bold tracking-tight uppercase">
                                Los mejores
                            </p>
                            <h1 className="text-5xl font-extrabold">Computadores</h1>
                        </div>
                        <p className="text-pretty w-full text-gray-300 text-lg mb-4">
                            Descubre nuestra amplia selección de computadores de la más alta calidad, 
                            que abarca desde potentes laptops hasta veloces desktops, 
                            pasando por avanzadas workstations y servidores.
                        </p>
                        <Link href="/computers">
                            <button className="btn bg-[#4e99d3] hover:bg-[#4e99d3]/80 w-fit text-black rounded-lg font-medium">
                                Ver Componentes
                            </button>
                        </Link>
                    </article>
                </div>
            </section>

            {/* Fourth section */}
            <section className="w-full px-3">
                <div className="w-full h-auto lg:h-[90vh] max-w-[1200px] mx-auto flex items-center">
                    <article className="w-2/5 hidden lg:block"></article>
                    <article className="w-full lg:max-w-3/5 flex flex-col gap-4">
                        <h1 className="text-5xl font-extrabold">Nuestras Caracteristicas</h1>
                        <p className="text-pretty w-full text-gray-300 text-lg mb-5">
                            En AC Computers nos enfocamos en brindar a nuestros clientes los mejores
                            productos y servicios al mejor precio del mercado. A continuacion, te
                            presentamos algunas de las caracteristicas que nos hacen destacar.
                        </p>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-10">
                            {[
                                {
                                    title: "Calidad",
                                    text: "Ofrecemos productos de alta calidad a precios competitivos, cumpliendo con los estándares de la industria.",
                                },
                                {
                                    title: "Garantía",
                                    text: "Brindamos garantía de 1 año en todos nuestros productos para mayor confianza.",
                                },
                                {
                                    title: "Servicio",
                                    text: "Nuestro equipo está capacitado para ofrecer la mejor atención al cliente.",
                                },
                                {
                                    title: "Envío",
                                    text: "Aseguramos envíos seguros y eficientes para una mejor experiencia de compra.",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-black/20 backdrop-blur p-4 rounded-lg text-center hover:scale-105 transition duration-300 ease-in-out cursor-default"
                                >
                                    <h3 className="text-white text-2xl font-bold tracking-tight uppercase mb-2">
                                        {item.title}
                                    </h3>
                                    <p>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}
