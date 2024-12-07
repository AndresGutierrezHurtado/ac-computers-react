import React from "react";
import { useParams } from "react-router";

// Hooks
import { useGetData } from "../hooks/useFetchApi.js";

// Components
import SwiperThumbnails from "../components/swiperThumbnails.jsx";
import LoadingContent from "../components/loadingContent.jsx";
import { BackIcon } from "../components/icons.jsx";
import { useRemoveBg } from "../hooks/useremoveBg.js";

export default function Product() {
    const { data: product, loading: loadingProduct } = useGetData(
        `/products/${useParams().id}`
    );

    const images = product &&  [
        {
            id: product.product_id,
            url: product.product_image_url,
            alt: product.product_name,
        },
        ...product.multimedias.map((multimedia) => ({
            id: multimedia.media_id,
            url: multimedia.media_url,
            alt: multimedia.media_name,
        })),
    ];

    
    if (loadingProduct) return <LoadingContent />;

    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="w-fit">
                            <SwiperThumbnails
                                images={images}
                                size={450}
                                product_id={product.product_id}
                            />
                        </div>
                        <div className="grow flex flex-col gap-2">
                            <p className="leading-none text-primary font-bold">
                                AC Computers {product.category_id == 1 ? "PC" : "Component"}
                            </p>
                            <h1 className="text-5xl font-extrabold tracking-tight">
                                {product.product_name}
                            </h1>
                            <p className="text-lg grow">
                                {product.product_description}
                            </p>
                            <div className="text-3xl font-bold text-primary">
                                {product.product_discount > 0 && (
                                    <p className="line-through text-2xl">
                                        COP{" "}
                                        {parseInt(
                                            product.product_price
                                        ).toLocaleString("es-CO")}
                                    </p>
                                )}
                                <p className="flex items-center gap-2">
                                    COP{" "}
                                    {parseInt(
                                        product.product_price *
                                            (1 - product.product_discount / 100)
                                    ).toLocaleString("es-CO")}
                                    {product.product_discount > 0 && (
                                        <span className="badge badge-primary badge-lg h-auto py-1.5 px-2 rounded-lg tracking-tight text-sm">
                                            {product.product_discount}%
                                        </span>
                                    )}
                                </p>
                            </div>
                            <button
                                onClick={() => window.history.back()}
                                className="btn btn-primary"
                            >
                                <BackIcon size={20} />
                                Volver
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div className="w-full">
                <div className="w-full max-w-[1200px] mx-auto">
                    <img src="/images/banner.jpg" alt={product.product_name} />
                </div>
            </div>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="space-y-2">
                        <h2 className="text-5xl font-extrabold tracking-tight mb-4">
                            {product.product_name}
                            {" - "}
                            <span className="text-3xl text-primary">
                                {"COP "}
                                {parseInt(
                                    product.product_price *
                                        (1 - product.product_discount / 100)
                                ).toLocaleString("es-CO")}
                            </span>
                        </h2>
                        <h2 className="text-2xl font-extrabold tracking-tight">
                            Especificaciones del producto:
                        </h2>
                        <ol>
                            {product.specs.map((spec) => (
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
