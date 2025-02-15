import React, { useState } from "react";

// Hooks
import { usePaginateData } from "../hooks/useFetchApi";

// Components
import LoadingContent from "../components/loadingContent.jsx";
import { Link } from "react-router";
import { DownloadIcon, PriceTagsIcon, SearchIcon } from "../components/icons.jsx";

export default function Computers() {
    const [filter, setFilter] = useState("");
    const { data: products, loading: loadingProducts } = usePaginateData(
        "/products?category_id=1&limit=10"
    );

    if (loadingProducts) return <LoadingContent />;

    const filteredProducts = products.filter((product) => {
        return (
            product.product_name.toLowerCase().includes(filter.toLowerCase()) ||
            product.product_description.toLowerCase().includes(filter.toLowerCase()) ||
            product.product_price.toLowerCase().includes(filter.toLowerCase())
        );
    });
    return (
        <section className="w-full px-3">
            <div className="w-full max-w-[1200px] mx-auto py-10">
                <div className="space-y-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 justify-between">
                        <h2 className="text-4xl font-extrabold tracking-tight">
                            Lista computadores:
                        </h2>
                        <label className="input input-sm input-bordered focus-within:outline-0 focus-within:input-primary flex items-center gap-2 w-full max-w-sm">
                            <input
                                type="text"
                                className="grow group"
                                placeholder="Buscar computadores"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                            <SearchIcon className="opacity-70 w-4 h-4" />
                        </label>
                    </div>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Link
                            to={`${import.meta.env.VITE_API_URL}/pdf/list?category_id=1`}
                            className="btn btn-primary w-fit px-5 btn-outline btn-sm py-2 h-auto flex-nowrap"
                        >
                            <DownloadIcon className="text-xl" />
                            Descargar lista PDF de computadores
                        </Link>
                        <Link
                            to={`${import.meta.env.VITE_API_URL}/pdf/list`}
                            className="btn btn-primary w-fit px-5 btn-sm py-2 h-auto flex-nowrap"
                        >
                            <PriceTagsIcon className="text-xl" />
                            Descargar lista de precios
                        </Link>
                    </div>

                    {filteredProducts.length === 0 && (
                        <section className="flex items-center justify-center flex-col gap-2 text-center">
                            <h1 className="text-7xl tracking-tight font-extrabold lg:text-9xl text-primary">
                                404
                            </h1>
                            <p className="mb-4 text-3xl tracking-tight font-bold text-white">
                                No se encuentran productos
                            </p>
                        </section>
                    )}

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-14">
                        {filteredProducts.map((product) => (
                            <div
                                className="card rounded-none [&_p]:grow-0"
                                key={product.product_id}
                            >
                                <Link
                                    to={`/computers/${product.product_id}`}
                                    className="w-full aspect-square"
                                >
                                    <img
                                        src={product.product_image_url}
                                        alt={product.product_name}
                                        className="w-full h-full object-contain"
                                    />
                                </Link>
                                <div className="card-body p-2 gap-0 text-center">
                                    <p>AC Computers</p>
                                    <Link
                                        to={`/computers/${product.product_id}`}
                                        className="font-bold text-lg leading-none tracking-tight hover:text-gray-400 hover:underline"
                                    >
                                        {product.product_name}
                                    </Link>
                                    <div className="flex justify-center gap-2">
                                        {product.product_discount > 0 && (
                                            <p className="line-through text-gray-400">
                                                {parseInt(product.product_price).toLocaleString(
                                                    "es-CO",
                                                    {
                                                        style: "currency",
                                                        currency: "COP",
                                                    }
                                                )}
                                            </p>
                                        )}
                                        <p>
                                            {parseInt(
                                                product.product_price *
                                                    (1 - product.product_discount / 100)
                                            ).toLocaleString("es-CO", {
                                                style: "currency",
                                                currency: "COP",
                                            })}
                                        </p>
                                    </div>
                                </div>
                                {product.product_discount > 0 && (
                                    <div className="absolute top-2 right-2">
                                        <div className="w-fit px-2 h-9 bg-primary rounded-full flex items-center justify-center text-sm font-semibold text-white">
                                            {product.product_discount}%
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
