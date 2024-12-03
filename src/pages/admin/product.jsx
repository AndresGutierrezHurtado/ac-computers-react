import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

// Components
import LoadingContent from "../../components/loadingContent";

// Hooks
import { useGetData } from "../../hooks/useFetchApi";
import { TrashIcon } from "../../components/icons";

export default function ProductProfile() {
    const [specs, setSpecs] = useState([{ name: "", value: "" }]);
    const [editable, setEditable] = useState(false);

    const { data: product, loading: loadingProduct } = useGetData(
        `/products/${useParams().id}`
    );

    useEffect(() => {
        if (product) {
            setSpecs(
                product.specs.map((spec) => ({
                    name: spec.spec_key,
                    value: spec.spec_value,
                }))
            );
        }
    }, [product]);

    if (loadingProduct) return <LoadingContent />;
    return (
        <section className="w-full px-3">
            <div className="w-full max-w-[1200px] mx-auto py-10">
                <div className="space-y-10">
                    <h2 className="text-4xl font-extrabold tracking-tight">
                        Perfil producto:
                    </h2>
                    <div className="flex gap-10">
                        <div className="w-full max-w-[400px] space-y-5">
                            <article className="card h-fit bg-black/10 w-full ">
                                <div className="card-body">
                                    <figure className="w-full max-w-[400px] aspect-square">
                                        <img
                                            src={product.product_image_url}
                                            alt={`Imagen del producto ${product.product_name}`}
                                            className="w-full h-full object-contain rounded"
                                        />
                                    </figure>
                                    <h2 className="card-title font-extrabold text-3xl">
                                        {product.product_name}
                                    </h2>
                                    <p className="text-sm">
                                        {product.product_description}
                                    </p>
                                    <div className="flex gap-2 pt-5">
                                        <button
                                            onClick={() =>
                                                setEditable(!editable)
                                            }
                                            className="btn btn-primary btn-outline grow"
                                        >
                                            Editar
                                        </button>
                                        <Link
                                            to={`/${
                                                product.category_id == 1
                                                    ? "computers"
                                                    : "components"
                                            }/${product.product_id}`}
                                            className="btn btn-primary"
                                        >
                                            Perfil
                                        </Link>
                                    </div>
                                </div>
                            </article>
                            <article className="card h-fit bg-black/10 w-full h-fit">
                                <div className="card-body">
                                    <h2 className="card-title font-extrabold text-3xl">
                                        Multimedias
                                    </h2>
                                    {product.multimedias.map((multimedia) => (
                                        <figure
                                            key={multimedia.media_id}
                                            className="w-full max-w-[400px] aspect-video bg-black/30 rounded-lg relative overflow-hidden group"
                                        >
                                            <img
                                                src={multimedia.media_url}
                                                alt={`Imagen del producto ${product.product_name}`}
                                                className="w-full h-full object-contain rounded  group-hover:scale-110 duration-300"
                                            />
                                            <button className="btn btn-sm btn-error text-white absolute bottom-2 right-2">
                                                <TrashIcon size={18} />
                                            </button>
                                        </figure>
                                    ))}
                                </div>
                            </article>
                        </div>
                        <div className="card bg-black/10 w-full h-fit">
                            <div className="card-body">
                                <h2 className="card-title font-extrabold text-3xl">
                                    Edición
                                </h2>
                                <form className="space-y-2">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold after:content-['*'] after:text-red-500 after:ml-1">
                                                Nombre
                                            </span>
                                        </label>
                                        <input
                                            defaultValue={product.product_name}
                                            className="input input-bordered focus:outline-0 focus:input-primary disabled:input-bordered"
                                            name="product_name"
                                            disabled={!editable}
                                        />
                                    </div>
                                    <div className="flex w-full gap-4">
                                        <div className="form-control grow">
                                            <label className="label">
                                                <span className="label-text font-semibold after:content-['*'] after:text-red-500 after:ml-1">
                                                    Precio
                                                </span>
                                            </label>
                                            <input
                                                defaultValue={
                                                    product.product_price
                                                }
                                                className="input input-bordered focus:outline-0 focus:input-primary disabled:input-bordered"
                                                name="product_price"
                                                disabled={!editable}
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold after:content-['*'] after:text-red-500 after:ml-1">
                                                    Descuento
                                                </span>
                                            </label>
                                            <input
                                                defaultValue={
                                                    product.product_discount
                                                }
                                                className="input input-bordered focus:outline-0 focus:input-primary disabled:input-bordered"
                                                name="product_discount"
                                                disabled={!editable}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold after:content-['*'] after:text-red-500 after:ml-1">
                                                Imagen
                                            </span>
                                        </label>
                                        <input
                                            type="file"
                                            className="file-input file-input-bordered file-input-primary disabled:input-bordered"
                                            name="product_image"
                                            disabled={!editable}
                                            accept="image/*"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold after:content-['*'] after:text-red-500 after:ml-1">
                                                Multimedias
                                            </span>
                                        </label>
                                        <input
                                            type="file"
                                            className="file-input file-input-bordered file-input-primary disabled:input-bordered"
                                            name="multimedias"
                                            disabled={!editable}
                                            multiple
                                            accept="image/*"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Especificaciones:
                                            </span>
                                        </label>
                                        <div className="flex flex-col gap-2">
                                            {specs.map((spec, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2"
                                                >
                                                    <input
                                                        name={`specs[${i}].name`}
                                                        placeholder={`Nombre ${
                                                            i + 1
                                                        }`}
                                                        defaultValue={spec.name}
                                                        className="input input-sm input-bordered focus:input-primary focus:outline-0 w-1/2 disabled:input-bordered"
                                                        disabled={!editable}
                                                    />
                                                    <input
                                                        name={`specs[${i}].value`}
                                                        placeholder={`Valor ${
                                                            i + 1
                                                        }`}
                                                        defaultValue={
                                                            spec.value
                                                        }
                                                        className="input input-sm input-bordered focus:input-primary focus:outline-0 w-1/2 disabled:input-bordered"
                                                        disabled={!editable}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-error disabled:input-bordered"
                                                        onClick={() => {
                                                            if (
                                                                specs.length ===
                                                                1
                                                            )
                                                                return;
                                                            setSpecs(
                                                                specs.filter(
                                                                    (_, j) =>
                                                                        j !== i
                                                                )
                                                            );
                                                        }}
                                                        disabled={!editable}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-secondary bg-black/20 py-2 mt-2 disabled:input-bordered"
                                                onClick={() =>
                                                    setSpecs([
                                                        ...specs,
                                                        { name: "", value: "" },
                                                    ])
                                                }
                                                disabled={!editable}
                                            >
                                                Agregar Especificación
                                            </button>
                                        </div>
                                    </div>
                                    {editable && (
                                        <div className="form-control pt-5">
                                            <button className="btn btn-primary">
                                                Guardar
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
