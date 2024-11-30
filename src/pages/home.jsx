import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import VanillaTilt from "vanilla-tilt";
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
    const { data: discounts, loading: loadingDiscounts } = useGetData(
        "/products?sort=product_discount&order=DESC&limit=4"
    );
    const { data: recents, loading: loadingRecents } = useGetData(
        "/products?sort=product_date&order=DESC&limit=5"
    );

    useEffect(() => {
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 5,
            speed: 10,
            glare: true,
            transition: true,
            "max-glare": 0.3,
        });
    }, [loadingDiscounts, discounts]);

    if (
        loadingComputers ||
        loadingComponents ||
        loadingDiscounts ||
        loadingRecents
    ) {
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
                                                <p className="text-primary text-3xl font-bold flex flex-col">
                                                    {computer.product_discount >
                                                        0 && (
                                                        <span className="line-through">
                                                            COP{" "}
                                                            {parseInt(
                                                                computer.product_price
                                                            ).toLocaleString(
                                                                "es-CO"
                                                            )}
                                                        </span>
                                                    )}
                                                    COP{" "}
                                                    {parseInt(
                                                        computer.product_price *
                                                            (1 -
                                                                computer.product_discount /
                                                                    100)
                                                    ).toLocaleString(
                                                        "es-CO"
                                                    )}{" "}
                                                    {computer.product_discount >
                                                        0 &&
                                                        `- ${computer.product_discount}%`}
                                                </p>
                                            </div>
                                            <Link
                                                to={`/computers/${computer.product_id}`}
                                                className="btn btn-outline btn-primary"
                                            >
                                                Información
                                            </Link>
                                        </div>
                                        <Link
                                            to={`/computers/${computer.product_id}`}
                                            className="w-full max-w-1/2 rounded overflow-hidden p-5"
                                        >
                                            <img
                                                src={computer.product_image_url}
                                                alt={`Imagen del producto ${computer.product_name}`}
                                            />
                                        </Link>
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
                                                <p className="text-primary text-3xl font-bold flex flex-col">
                                                    {component.product_discount >
                                                        0 && (
                                                        <span className="line-through">
                                                            COP{" "}
                                                            {parseInt(
                                                                component.product_price
                                                            ).toLocaleString(
                                                                "es-CO"
                                                            )}
                                                        </span>
                                                    )}
                                                    COP{" "}
                                                    {parseInt(
                                                        component.product_price *
                                                            (1 -
                                                                component.product_discount /
                                                                    100)
                                                    ).toLocaleString(
                                                        "es-CO"
                                                    )}{" "}
                                                    {component.product_discount >
                                                        0 &&
                                                        `- ${component.product_discount}%`}
                                                </p>
                                            </div>
                                            <Link
                                                to={`/components/${component.product_id}`}
                                                className="btn btn-outline btn-primary"
                                            >
                                                Información
                                            </Link>
                                        </div>
                                        <Link
                                            to={`/components/${component.product_id}`}
                                            className="w-full max-w-1/2 rounded overflow-hidden p-5"
                                        >
                                            <img
                                                src={
                                                    component.product_image_url
                                                }
                                                alt={`Imagen del producto ${component.product_name}`}
                                            />
                                        </Link>
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
            <hr className="w-full max-w-[1200px] mx-auto border-gray-600" />
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="space-y-5">
                        <h2 className="text-5xl font-extrabold tracking-tight text-center">
                            Descuentos:
                        </h2>
                        <div className="grid grid-cols-[repeat(auto-fit,_minmax(500px,_1fr))] gap-12">
                            {discounts.map((discount) => (
                                <article
                                    key={discount.product_id}
                                    className="card w-full bg-black/20 backdrop-blur-sm shadow-xl border border-gray-800/60 tilt"
                                >
                                    <div className="card-body flex-row">
                                        <div className="grow space-y-2">
                                            <h2 className="text-2xl font-extrabold">
                                                {discount.product_name}
                                            </h2>
                                            <div className="text-primary text-[17px] font-semibold leading-[1.2]">
                                                <p className="line-through">
                                                    COP{" "}
                                                    {parseInt(
                                                        discount.product_price
                                                    ).toLocaleString("es-CO")}
                                                </p>
                                                <p>
                                                    COP{" "}
                                                    {parseInt(
                                                        discount.product_price -
                                                            discount.product_price *
                                                                (discount.product_discount /
                                                                    100)
                                                    ).toLocaleString(
                                                        "es-CO"
                                                    )}{" "}
                                                    -{" "}
                                                    {discount.product_discount}%
                                                </p>
                                            </div>
                                            <Link
                                                to={`/${
                                                    discount.category_id == 1
                                                        ? "computers"
                                                        : "components"
                                                }/${discount.product_id}`}
                                                className="btn btn-primary btn-outline btn-sm"
                                            >
                                                Ver
                                            </Link>
                                        </div>
                                        <figure className="w-1/2 rounded overflow-hidden">
                                            <img
                                                src={discount.product_image_url}
                                                alt={`Imagen del producto ${discount.product_name}`}
                                                className="object-contain w-full h-full"
                                            />
                                        </figure>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <hr className="w-full max-w-[1200px] mx-auto border-gray-600" />
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="space-y-5">
                        <h2 className="text-5xl font-extrabold tracking-tight text-center">
                            Productos nuevos:
                        </h2>
                        <Swiper>
                            {recents.map((rec) => (
                                <SwiperSlide key={rec.product_id}></SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    );
}
