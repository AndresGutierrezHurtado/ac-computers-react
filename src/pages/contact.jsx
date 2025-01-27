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
import { useValidateform } from "../hooks/useValidateForm";

export default function Contact() {
    const socialMedias = [
        {
            icon: <InstagramIcon size={20} />,
            url: "https://www.instagram.com/accomputersas/",
            text: "Instagram: @accomputersas",
        },
        {
            icon: <FacebookIcon size={20} />,
            url: "https://web.facebook.com/Amaliacastrode",
            text: "Facebook: Amalia Castro Ardila",
        },
        {
            icon: <WhatsappIcon size={20} />,
            url: "https://wa.me/+573118835868",
            text: "WhatsApp: 311 8835868",
        },
        {
            icon: <AtIcon size={20} />,
            url: "mailto:amaliacastro78@example.com",
            text: "Correo: amaliacastro78@gmail.com",
        },
        {
            icon: <LocationIcon size={20} />,
            url: "https://maps.app.goo.gl/qHg7MtCmABNfReT8A",
            text: "Ubicación: Cra. 15 #77 05, Bogotá",
        },
    ];

    const handleContactFormSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));
        const validation = useValidateform(data, "contact-form");

        if (validation.success) {
            const response = await usePostData("/user/feedback", data);

            if (response.success) {
                e.target.reset();
            }
        }
    };

    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="flex flex-col md:flex-row gap-10 w-full">
                        <div className="w-full md:w-1/2 space-y-8">
                            <div className="space-y-3">
                                <h2 className="text-4xl font-extrabold tracking-tight">
                                    Contáctanos:
                                </h2>
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Suscipit corrupti qui adipisci eius dignissimos sunt quo libero,
                                    quae voluptates magnam temporibus in reprehenderit voluptatum
                                    porro animi dolor. Minima, repudiandae at reiciendis obcaecati,
                                    necessitatibus ducimus odio fugit iure quaerat natus amet modi!
                                    Ipsam, tempore! Odit ducimus molestias dolor neque doloribus
                                    qui.
                                </p>
                            </div>
                            <ol className="space-y-2.5">
                                {socialMedias.map((socialMedia) => (
                                    <Link
                                        key={socialMedia.text}
                                        to={socialMedia.url}
                                        target="_blank"
                                        role="alert"
                                        className="alert rounded-lg w-full max-w-lg"
                                    >
                                        {socialMedia.icon}
                                        <div>
                                            <div className="text-lg">{socialMedia.text}</div>
                                        </div>
                                    </Link>
                                ))}
                            </ol>
                        </div>
                        <div className="card bg-[#20202b] w-full md:w-1/2">
                            <div className="card-body [&_p]:grow-0">
                                <form onSubmit={handleContactFormSubmit} className="space-y-2">
                                    <div>
                                        <h2 className="text-3xl font-extrabold">
                                            ¡Queremos escucharte!
                                        </h2>
                                        <p className="leading-[1.35]">
                                            Dejanos tu mensaje y nos pondremos en contacto.{" "}
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
                                            name="user_email"
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
                                            name="email_subject"
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
                                            name="email_message"
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
