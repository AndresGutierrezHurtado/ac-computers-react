import React, { useEffect } from "react";
import { flushSync } from "react-dom";
import { Link, useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, EffectCoverflow } from "swiper/modules";
import VanillaTilt from "vanilla-tilt";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// Hooks
import { useGetData } from "../hooks/useFetchApi.js";

// Components
import { StarIcon } from "../components/icons.jsx";

export default function Home() {
    const navigate = useNavigate();

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
            max: 10,
            scale: 1.04,
            speed: 400,
            transition: true,
            glare: true,
            "max-glare": 0.3,
            reverse: true,
        });
    }, [loadingDiscounts, discounts]);

    const handleNavigation = (path) => {
        if (!document.startViewTransition) {
            console.log("No view transition");
            return navigate(path);
        }

        document.startViewTransition(() => {
            flushSync(() => {
                navigate(path, { state: { product: "fetchedData" } });
            });
        });
    };

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
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center">
                            Computadoras:
                        </h2>
                        <Swiper
                            slidesPerView={1}
                            rewind={true}
                            modules={[Navigation, Pagination, A11y]}
                            navigation={{ clickable: true }}
                            pagination={{ clickable: true }}
                        >
                            {computers.slice(0, 5).map((computer) => (
                                <SwiperSlide
                                    key={computer.product_id}
                                    className="px-10 md:px-16 pb-10 w-full h-[550px]"
                                >
                                    <div className="flex flex-col-reverse md:flex-row w-full items-center">
                                        <div className="w-full md:max-w-1/2 space-y-4">
                                            <div className="text-center md:text-start">
                                                <h2 className="text-3xl md:text-5xl font-extrabold">
                                                    {computer.product_name}
                                                </h2>
                                                <div className="text-3xl font-bold text-primary">
                                                    {computer.product_discount >
                                                        0 && (
                                                        <p className="line-through text-2xl">
                                                            COP{" "}
                                                            {parseInt(
                                                                computer.product_price
                                                            ).toLocaleString(
                                                                "es-CO"
                                                            )}
                                                        </p>
                                                    )}
                                                    <p>
                                                        COP{" "}
                                                        {parseInt(
                                                            computer.product_price *
                                                                (1 -
                                                                    computer.product_discount /
                                                                        100)
                                                        ).toLocaleString(
                                                            "es-CO"
                                                        )}
                                                        {computer.product_discount >
                                                            0 &&
                                                            ` - ${computer.product_discount}%`}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mx-auto w-fit md:mx-0">
                                                <a
                                                    onClick={() =>
                                                        handleNavigation(
                                                            `/computers/${computer.product_id}`
                                                        )
                                                    }
                                                    style={{
                                                        viewTransitionName: `product-${computer.product_id}`,
                                                    }}
                                                    className="btn btn-outline btn-primary"
                                                >
                                                    Información
                                                </a>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/computers/${computer.product_id}`}
                                            className="w-full md:max-w-1/2 rounded overflow-hidden p-5"
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
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center">
                            Componentes:
                        </h2>
                        <Swiper
                            slidesPerView={1}
                            rewind={true}
                            modules={[Navigation, Pagination, A11y]}
                            navigation={{ clickable: true }}
                            pagination={{ clickable: true }}
                        >
                            {components.slice(0, 5).map((component) => (
                                <SwiperSlide
                                    key={component.product_id}
                                    className="px-10 md:px-16 pb-10 w-full h-[550px]"
                                >
                                    <div className="flex flex-col-reverse md:flex-row w-full items-center">
                                        <div className="w-full md:max-w-1/2 space-y-4">
                                            <div className="text-center md:text-start">
                                                <h2 className="text-3xl md:text-5xl font-extrabold">
                                                    {component.product_name}
                                                </h2>
                                                <div className="text-3xl font-bold text-primary">
                                                    {component.product_discount >
                                                        0 && (
                                                        <p className="line-through text-2xl">
                                                            COP{" "}
                                                            {parseInt(
                                                                component.product_price
                                                            ).toLocaleString(
                                                                "es-CO"
                                                            )}
                                                        </p>
                                                    )}
                                                    <p>
                                                        COP{" "}
                                                        {parseInt(
                                                            component.product_price *
                                                                (1 -
                                                                    component.product_discount /
                                                                        100)
                                                        ).toLocaleString(
                                                            "es-CO"
                                                        )}
                                                        {component.product_discount >
                                                            0 &&
                                                            ` - ${component.product_discount}%`}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mx-auto w-fit md:mx-0">
                                                <Link
                                                    to={`/components/${component.product_id}`}
                                                    className="btn btn-outline btn-primary"
                                                >
                                                    Información
                                                </Link>
                                            </div>
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
                        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] md:grid-cols-[repeat(auto-fit,_minmax(500px,_1fr))] gap-12">
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
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={50}
                            rewind={true}
                            effect="coverflow"
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            modules={[
                                Navigation,
                                Pagination,
                                A11y,
                                EffectCoverflow,
                            ]}
                            navigation={{ clickable: true }}
                            pagination={{ clickable: true }}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: false,
                            }}
                        >
                            <main className="px-10">
                                {recents.map((rec, index) => (
                                    <SwiperSlide
                                        key={rec.product_id}
                                        className="h-[initial_!important] pb-10 pt-2"
                                    >
                                        <article
                                            key={rec.product_id}
                                            className="card w-full h-full bg-black/20 backdrop-blur-sm shadow-xl border border-gray-800/60 tilt"
                                        >
                                            <div className="card-body text-center">
                                                <figure className="w-3/4 aspect-square mx-auto rounded overflow-hidden">
                                                    <img
                                                        src={
                                                            rec.product_image_url
                                                        }
                                                        alt={`Imagen del producto ${rec.product_name}`}
                                                        className="object-contain w-full h-full"
                                                    />
                                                </figure>
                                                <div className="grow space-y-2 flex flex-col items-center">
                                                    <div className="leading-1 ">
                                                        <h2 className="text-2xl font-extrabold leading-[1]">
                                                            {rec.product_name}
                                                        </h2>
                                                        <p>
                                                            {new Date(
                                                                rec.product_date
                                                            ).toLocaleDateString(
                                                                "es-CO"
                                                            )}
                                                        </p>
                                                        <p className="flex items-center gap-2 justify-center">
                                                            {" "}
                                                            <StarIcon />{" "}
                                                            <span>
                                                                Calidad Premium
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="grow text-primary text-[17px] font-semibold leading-[1.2]">
                                                        {rec.product_discount >
                                                            0 && (
                                                            <p className="line-through">
                                                                COP{" "}
                                                                {parseInt(
                                                                    rec.product_price
                                                                ).toLocaleString(
                                                                    "es-CO"
                                                                )}
                                                            </p>
                                                        )}
                                                        <p>
                                                            COP{" "}
                                                            {parseInt(
                                                                rec.product_price -
                                                                    rec.product_price *
                                                                        (rec.product_discount /
                                                                            100)
                                                            ).toLocaleString(
                                                                "es-CO"
                                                            )}{" "}
                                                            {rec.product_discount >
                                                                0 &&
                                                                `- ${rec.product_discount}%`}
                                                        </p>
                                                    </div>
                                                    <Link
                                                        to={`/${
                                                            rec.category_id == 1
                                                                ? "computers"
                                                                : "components"
                                                        }/${rec.product_id}`}
                                                        className="btn btn-primary btn-outline w-full"
                                                    >
                                                        Ver
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    </SwiperSlide>
                                ))}
                            </main>
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    );
}
