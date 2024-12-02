import React, { useState } from "react";
import { Link } from "react-router";

// Hooks
import { useGetData } from "../../hooks/useFetchApi";

// Components
import LoadingContent from "../../components/loadingContent";
import { EditIcon, SearchIcon, TrashIcon } from "../../components/icons";

export default function Products() {
    const { data: products, loading: loadingProducts } =
        useGetData("/products");

    if (loadingProducts) return <LoadingContent />;
    return (
        <section className="w-full px-3">
            <div className="w-full max-w-[1200px] mx-auto py-10">
                <div className="space-y-5">
                    <div className="flex justify-between items-center w-full">
                        <h1 className="text-3xl font-bold mb-4">
                            Administrar productos
                        </h1>
                        <button className="btn btn-primary btn-outline">
                            {" "}
                            + Crear producto{" "}
                        </button>
                    </div>
                    <div className="card bg-[#20202b] rounded [&_p]:grow-0">
                        <div className="card-body p-4">
                            <div className="flex justify-between items-center w-full">
                                <h2 className="text-3xl font-bold">
                                    Productos
                                </h2>
                                <label className="input input-sm input-bordered focus-within:outline-0 focus-within:input-primary flex items-center gap-2 w-full max-w-sm h-auto py-1">
                                    <input
                                        className="grow group"
                                        placeholder="Buscar productos"
                                        name="search"
                                    />
                                    <kbd className="kbd kbd-sm cursor-pointer hover:bg-gray-900 p-1 px-1.5">
                                        <SearchIcon className="opacity-70 w-4 h-4" />
                                    </kbd>
                                </label>
                            </div>
                        </div>
                        <table className="w-full table rounded">
                            <thead className="transparent bg-[#242430]">
                                <tr className="text-[15px] [&>*]:py-3">
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Descuento</th>
                                    <th>Tipo</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.product_id}>
                                        <td>
                                            {product.product_id.split("-")[1]}
                                        </td>
                                        <td>{product.product_name}</td>
                                        <td>
                                            COP{" "}
                                            {parseInt(
                                                product.product_price
                                            ).toLocaleString("es-CO")}
                                        </td>
                                        <td>{product.product_discount}%</td>
                                        <td>
                                            {product.category.category_name}
                                        </td>
                                        <td>
                                            {new Date(
                                                product.product_date
                                            ).toLocaleString("es-CO")}
                                        </td>
                                        <td className="space-x-2">
                                            <Link to={`/profile/products/${product.product_id}`} className="btn btn-primary btn-outline btn-sm">
                                                <EditIcon size={16} />
                                            </Link>
                                            <button className="btn btn-error btn-outline btn-sm">
                                                <TrashIcon />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                <tr className="[&>*]:py-4 bg-[#242430]">
                                    <td colSpan={7}></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="card-body p-4">
                            <div className="flex justify-between items-center w-full">
                                <p>Mostrando * - * resultados</p>
                                <div className="flex items-center gap-2">
                                    <button className="btn p-0 h-auto min-h-[auto_!important]">
                                        <kbd className=" kbd">Anterior</kbd>
                                    </button>
                                    <button className="btn p-0 h-auto min-h-[auto_!important]">
                                        <kbd className="kbd">Siguiente</kbd>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
