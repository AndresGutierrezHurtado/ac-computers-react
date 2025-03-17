import React from "react";

export const dynamic = "force-dynamic";

export default async function Page() {
    const response = await fetch(process.env.APP_DOMAIN + "/api/products");
    const { data: products } = await response.json();

    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto mt-[100px]">
                    <h1 className="text-5xl font-bold">Productos</h1>
                </div>
            </section>
        </>
    );
}
