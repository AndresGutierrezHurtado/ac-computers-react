import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Hooks
import { useGetData } from "../hooks/useFetchApi.js";
import { Link } from "react-router";

export default function Home() {
    const { data: computers, loading: loadingComputers } = useGetData(
        "/products?category_id=1"
    );

    const { data: components, loading: loadingComponents } = useGetData(
        "/products?category_id=2"
    );

    if (loadingComputers || loadingComponents) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <article className="space-y-5">
                        <h2 className="text-5xl font-extrabold tracking-tight text-center">
                            Computadoras:
                        </h2>
                        <Swiper
                            slidesPerView={1}
                            modules={[Navigation, Pagination, A11y]}
                            navigation={{ clickable: true }}
                            pagination={{ clickable: true }}
                        >
                            {computers.slice(0, 5).map((computer) => (
                                <SwiperSlide
                                    key={computer.product_id}
                                    className="px-16 pb-10 w-full h-[550px]"
                                >
                                    <div className="flex w-full items-center">
                                        <div className="w-full max-w-1/2 space-y-4">
                                            <div>
                                                <h2 className="text-5xl font-extrabold">
                                                    {computer.product_name}
                                                </h2>
                                                <p className="text-primary text-3xl font-bold">
                                                    COP{" "}
                                                    {parseInt(
                                                        computer.product_price
                                                    ).toLocaleString("es-CO")}
                                                </p>
                                            </div>
                                            <Link
                                                to={`/computers/${computer.product_id}`}
                                                className="btn btn-outline btn-primary"
                                            >
                                                Información
                                            </Link>
                                        </div>
                                        <figure className="w-full max-w-1/2 rounded overflow-hidden p-5">
                                            <img
                                                src={computer.product_image_url}
                                                alt={`Imagen del producto ${computer.product_name}`}
                                            />
                                        </figure>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="w-full flex justify-center">
                            <Link to="/computers" className="btn btn-primary">
                                Ver lista completa
                            </Link>
                        </div>
                    </article>
                </div>
            </section>
            <hr className="w-full max-w-[1200px] mx-auto border-gray-600" />
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <article className="space-y-5">
                        <h2 className="text-5xl font-extrabold tracking-tight text-center">
                            Componentes:
                        </h2>
                        <Swiper
                            slidesPerView={1}
                            modules={[Navigation, Pagination, A11y]}
                            navigation={{ clickable: true }}
                            pagination={{ clickable: true }}
                        >
                            {components.slice(0, 5).map((component) => (
                                <SwiperSlide
                                    key={component.product_id}
                                    className="px-16 pb-10 w-full h-[550px]"
                                >
                                    <div className="flex w-full items-center">
                                        <div className="w-full max-w-1/2 space-y-4">
                                            <div>
                                                <h2 className="text-5xl font-extrabold">
                                                    {component.product_name}
                                                </h2>
                                                <p className="text-primary text-3xl font-bold">
                                                    COP{" "}
                                                    {parseInt(
                                                        component.product_price
                                                    ).toLocaleString("es-CO")}
                                                </p>
                                            </div>
                                            <Link
                                                to={`/components/${component.product_id}`}
                                                className="btn btn-outline btn-primary"
                                            >
                                                Información
                                            </Link>
                                        </div>
                                        <figure className="w-full max-w-1/2 rounded overflow-hidden p-5">
                                            <img
                                                src={
                                                    component.product_image_url
                                                }
                                                alt={`Imagen del producto ${component.product_name}`}
                                            />
                                        </figure>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="w-full flex justify-center">
                            <Link to="/components" className="btn btn-primary">
                                Ver lista completa
                            </Link>
                        </div>
                    </article>
                </div>
            </section>
        </>
    );
}
