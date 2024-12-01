import React from "react";
import { useParams } from "react-router";
import { useGetData } from "../hooks/useFetchApi.js";

export default function Computer() {
    const { data: computer, loading: loadingComputer } = useGetData(`/products/${useParams().id}`);

    if (loadingComputer) return <h1> Cargando producto </h1>;
    return (
        <section className="w-full px-3">
            <div className="w-full max-w-[12000px] mx-auto">
                <div></div>
            </div>
        </section>
    );
}
