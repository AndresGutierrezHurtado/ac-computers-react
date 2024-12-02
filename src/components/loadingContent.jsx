import React from "react";

export default function LoadingContent() {
    return (
        <div className="overlay">
            <span class="loading loading-spinner loading-lg"></span>
            <h3>Cargando...</h3>
            <p>Espera un momento</p>
        </div>
    );
}
