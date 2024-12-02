import React from "react";
import { useLocation, useParams } from "react-router";

// Hooks
import { useGetData } from "../hooks/useFetchApi.js";

// Components
import SwiperThumbnails from "../components/swiperThumbnails.jsx";
import LoadingContent from "../components/loadingContent.jsx";

export default function Computer() {
    const location = useLocation();

    const { data: product, loading: loadingProduct } = useGetData(
        `/products/${useParams().id}`
    );

    const computer = location.state?.product || product;

    if (loadingProduct && !location.state) return <LoadingContent />;

    const images = [
        {
            id: computer.product_id,
            url: computer.product_image_url,
            alt: computer.product_name,
        },
        ...computer.multimedias.map((multimedia) => ({
            id: multimedia.media_id,
            url: multimedia.media_url,
            alt: multimedia.media_name,
        })),
    ];

    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="flex gap-10">
                        <div className="w-fit">
                            <SwiperThumbnails
                                images={images}
                                size={450}
                                product_id={computer.product_id}
                            />
                        </div>
                        <div className="grow flex flex-col gap-2">
                            <h1 className="text-5xl font-extrabold tracking-tight">
                                {computer.product_name}
                            </h1>
                            <p className="text-lg grow">
                                {computer.product_description}
                            </p>
                            <div className="text-3xl font-bold text-primary">
                                {computer.product_discount > 0 && (
                                    <p className="line-through text-2xl">
                                        COP{" "}
                                        {parseInt(
                                            computer.product_price
                                        ).toLocaleString("es-CO")}
                                    </p>
                                )}
                                <p>
                                    COP{" "}
                                    {parseInt(
                                        computer.product_price *
                                            (1 -
                                                computer.product_discount / 100)
                                    ).toLocaleString("es-CO")}
                                    {computer.product_discount > 0 &&
                                        ` - ${computer.product_discount}%`}
                                </p>
                            </div>
                            <button className="btn btn-primary">Volver</button>
                        </div>
                    </div>
                </div>
            </section>
            <div className="w-full">
                <div className="w-full max-w-[1200px] mx-auto">
                    <img
                        src="https://cdn.shopify.com/s/files/1/0482/9983/5557/files/PARA_PAGINA_WEB_BANNER_diciembre-min.jpg?v=1730930575"
                        alt={computer.product_name}
                    />
                </div>
            </div>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="space-y-2">
                        <h2 className="text-5xl font-extrabold tracking-tight mb-4">
                            {computer.product_name}
                            {" - "}
                            <span className="text-3xl text-primary">
                                {"COP "}
                                {parseInt(
                                    computer.product_price *
                                        (1 - computer.product_discount / 100)
                                ).toLocaleString("es-CO")}
                            </span>
                        </h2>
                        <h2 className="text-2xl font-extrabold tracking-tight">
                            Especificaciones del producto:
                        </h2>
                        <ol>
                            {computer.specs.map((spec) => (
                                <div
                                    key={spec.spec_id}
                                    className="flex items-end gap-2"
                                >
                                    <h3 className="text-lg font-bold">
                                        {spec.spec_key}:
                                    </h3>
                                    <p>{spec.spec_value}</p>
                                </div>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>
        </>
    );
}
