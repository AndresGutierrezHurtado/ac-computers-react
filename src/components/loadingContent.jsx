import React from "react";

export default function LoadingContent() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-[999]">
            <article className="text-center space-y-5 max-w-md">
                <span className="loading loading-spinner w-[120px] mx-auto"></span>
                <div className="flex flex-col items-center justify-center gap-1">
                    <div className="text-6xl font-extrabold flex items-end gap-2">
                        <h3>Cargando</h3>
                    </div>
                    <p className="text-lg text-gray-400">
                        Espera un momento en lo que carga tu catalogo de
                        productos
                    </p>
                </div>
            </article>
        </div>
    );
}
