import React, { useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

// Hooks
import { useDeleteData, usePaginateData } from "../../hooks/useFetchApi";

// Components
import LoadingContent from "../../components/loadingContent";
import { EditIcon, SearchIcon, TrashIcon } from "../../components/icons";
import CreateProduct from "../../components/profile/createProduct";

export default function Products() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("product_id:asc");
    const {
        data: products,
        loading: loadingProducts,
        reload: reloadProducts,
        count: productsCount,
        page: productsPage,
        limit: productsLimit,
    } = usePaginateData(
        `/products?page=${page}&limit=10&sort=${sort}${
            search.length > 1 ? `&search=${search}` : ""
        }`
    );

    const handleDeleteUser = (id, name) => {
        Swal.fire({
            icon: "warning",
            title: "¿Estás seguro de esta acción?",
            text: `Eliminar a ${name} será irrevertible`,
            showConfirmButton: true,
            showDenyButton: true,
            confirmButtonColor: "red",
            denyButtonColor: "green",
            confirmButtonText: "Borrar",
            denyButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await useDeleteData(`/products/${id}`);

                if (response.success) {
                    reloadProducts();
                    setPage(1);
                }
            }
        });
    };

    if (loadingProducts) return <LoadingContent />;
    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="space-y-5">
                        <div className="flex justify-between items-center w-full">
                            <h1 className="text-3xl font-bold mb-4">
                                Administrar productos
                            </h1>
                            <button
                                onClick={() =>
                                    document
                                        .getElementById("create-product")
                                        .show()
                                }
                                className="btn btn-primary btn-outline"
                            >
                                + Crear Producto
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
                                            value={search}
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                                setPage(1);
                                            }}
                                        />
                                        <kbd className="kbd kbd-sm cursor-pointer hover:bg-gray-900 p-1 px-1.5">
                                            <SearchIcon className="opacity-70 w-4 h-4" />
                                        </kbd>
                                    </label>
                                </div>
                            </div>
                            <table className="w-full table rounded">
                                <thead className="transparent bg-[#242430]">
                                    <tr className="text-[15px] [&>*]:py-3 [&>*]:cursor-pointer [&>*:hover]:text-white">
                                        <th
                                            onClick={() =>
                                                setSort("product_id:asc")
                                            }
                                        >
                                            ID
                                        </th>
                                        <th
                                            onClick={() =>
                                                setSort("product_name:asc")
                                            }
                                        >
                                            Nombre
                                        </th>
                                        <th
                                            onClick={() =>
                                                setSort("product_price:desc")
                                            }
                                        >
                                            Precio
                                        </th>
                                        <th
                                            onClick={() =>
                                                setSort("product_discount:desc")
                                            }
                                        >
                                            Descuento
                                        </th>
                                        <th
                                            onClick={() =>
                                                setSort("category_id:asc")
                                            }
                                        >
                                            Tipo
                                        </th>
                                        <th
                                            onClick={() =>
                                                setSort("product_date:desc")
                                            }
                                        >
                                            Fecha
                                        </th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.product_id}>
                                            <td>
                                                {
                                                    product.product_id.split(
                                                        "-"
                                                    )[1]
                                                }
                                            </td>
                                            <td>{product.product_name}</td>
                                            <td>
                                                COP{" "}
                                                {parseInt(
                                                    product.product_price
                                                ).toLocaleString("es-CO")}
                                            </td>
                                            <td>{product.product_discount}%</td>
                                            <td className="capitalize">
                                                {product.category.category_name}
                                            </td>
                                            <td>
                                                {new Date(
                                                    product.product_date
                                                ).toLocaleString("es-CO")}
                                            </td>
                                            <td className="space-x-2">
                                                <Link
                                                    to={`/admin/products/${product.product_id}`}
                                                    className="btn btn-primary btn-outline btn-sm"
                                                >
                                                    <EditIcon size={16} />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteUser(
                                                            product.product_id,
                                                            product.product_name
                                                        )
                                                    }
                                                    className="btn btn-error btn-outline btn-sm"
                                                >
                                                    <TrashIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    <tr className="[&>*]:py-4 bg-[#242430] text-center text-xl ">
                                        <td colSpan={7}>
                                            {products.length === 0 &&
                                                "No hay productos..."}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="card-body p-4">
                                <div className="flex justify-between items-center w-full">
                                    <p>
                                        Mostrando{" "}
                                        {productsPage * productsLimit -
                                            productsLimit +
                                            1}
                                        {" - "}
                                        {productsPage * productsLimit -
                                            productsLimit +
                                            1 +
                                            products.length -
                                            1}
                                        {` de ${productsCount} resultados`}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                setPage((prev) => prev - 1)
                                            }
                                            disabled={productsPage <= 1}
                                            className="btn p-0 h-auto min-h-[auto_!important] disabled:opacity-30"
                                        >
                                            <kbd className="kbd">Anterior</kbd>
                                        </button>
                                        <button
                                            onClick={() =>
                                                setPage((prev) => prev + 1)
                                            }
                                            disabled={
                                                productsPage >=
                                                productsCount / productsLimit
                                            }
                                            className="btn p-0 h-auto min-h-[auto_!important] disabled:opacity-30"
                                        >
                                            <kbd className="kbd">Siguiente</kbd>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <CreateProduct reloadProducts={reloadProducts} />
        </>
    );
}
