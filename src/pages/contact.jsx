import React from "react";
import { Link } from "react-router";

// Components
import {
    AtIcon,
    FacebookIcon,
    InstagramIcon,
    LocationIcon,
    UploadIcon,
    WhatsappIcon,
} from "../components/icons";
import { StoreMap } from "../components/map";

// Hooks
import { usePostData } from "../hooks/useFetchApi";

export default function Contact() {
    const socialMedias = [
        {
            icon: <InstagramIcon size={20} />,
            url: "https://www.instagram.com/accomputers/",
            text: "Instagram: @accomputers",
        },
        {
            icon: <FacebookIcon size={20} />,
            url: "https://www.facebook.com/ACComputers",
            text: "Facebook: ACComputers",
        },
        {
            icon: <WhatsappIcon size={20} />,
            url: "https://wa.me/+573118835868",
            text: "WhatsApp: 311 8835868",
        },
        {
            icon: <AtIcon size={20} />,
            url: "mailto:KtH5d@example.com",
            text: "Correo: amaliacastro78@gmail.com",
        },
        {
            icon: <LocationIcon size={20} />,
            url: "https://www.google.com/maps/place/AC+Computers/@3.4015677,-76.5133004,15z/data=!4m5!3m4!1s0x8e3b9d8a5d8d8d8d:0x8e3b9d8a5d8d8d8d!8m2!3d3.4015677!4d-76.5133004",
            text: "Ubicación: Calle 12 # 12-12, Bogotá, Colombia",
        },
    ];

    const handleContactFormSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        const response = await usePostData("/user/feedback", data);

        if (response.success) {
            e.target.reset();
        }
    };

    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="flex gap-10 w-full">
                        <div className="w-full md:w-1/2 space-y-8">
                            <div className="space-y-3">
                                <h2 className="text-4xl font-extrabold tracking-tight">
                                    Contáctanos:
                                </h2>
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur
                                    adipisicing elit. Suscipit corrupti qui
                                    adipisci eius dignissimos sunt quo libero,
                                    quae voluptates magnam temporibus in
                                    reprehenderit voluptatum porro animi dolor.
                                    Minima, repudiandae at reiciendis obcaecati,
                                    necessitatibus ducimus odio fugit iure
                                    quaerat natus amet modi! Ipsam, tempore!
                                    Odit ducimus molestias dolor neque doloribus
                                    qui.
                                </p>
                            </div>
                            <ol className="space-y-2.5">
                                {socialMedias.map((socialMedia) => (
                                    <Link
                                        key={socialMedia.text}
                                        to={socialMedia.url}
                                        role="alert"
                                        className="alert rounded-lg w-full max-w-lg"
                                    >
                                        {socialMedia.icon}
                                        <div>
                                            <div className="text-lg">
                                                {socialMedia.text}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </ol>
                        </div>
                        <div className="card bg-[#20202b] w-full md:w-1/2">
                            <div className="card-body [&_p]:grow-0">
                                <form
                                    onSubmit={handleContactFormSubmit}
                                    className="space-y-2"
                                >
                                    <div>
                                        <h2 className="text-3xl font-extrabold">
                                            ¡Queremos escucharte!
                                        </h2>
                                        <p className="leading-[1.35]">
                                            Dejanos tu mensaje y nos pondremos
                                            en contacto.{" "}
                                        </p>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold after:content-['*'] after:text-red-500 after:ml-1">
                                                Correo electrónico:
                                            </span>
                                        </label>
                                        <input
                                            placeholder="ejemplo@gmail.com"
                                            className="input input-bordered focus:input-primary focus:outline-0"
                                            name="email"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold after:content-['*'] after:text-red-500 after:ml-1">
                                                Asunto:
                                            </span>
                                        </label>
                                        <input
                                            placeholder="¿De que se trata el mensaje?"
                                            className="input input-bordered focus:input-primary focus:outline-0"
                                            name="subject"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold after:content-['*'] after:text-red-500 after:ml-1">
                                                Mensaje:
                                            </span>
                                        </label>
                                        <textarea
                                            className="textarea textarea-bordered resize-none h-32 focus:textarea-primary focus:outline-0"
                                            placeholder="Ingresa tu mensaje"
                                            name="message"
                                        ></textarea>
                                    </div>

                                    <div className="form-control pt-5">
                                        <button className="btn w-full btn-primary">
                                            <UploadIcon size={20} />
                                            Enviar mensaje
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="space-y-5">
                        <h2 className="text-4xl font-extrabold tracking-tight">
                            Nuestra ubicación:
                        </h2>
                        <div className="w-full h-[400px] overflow-hidden border rounded-lg">
                            <StoreMap />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
