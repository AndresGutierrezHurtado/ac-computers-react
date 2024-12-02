import React from "react";

export default function EditUser({ product }) {
    const handleFormSubmit = () => {};

    return (
        <>
            <dialog id={`edit-product-${product.product_id}`} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-extrabold text-2xl tracking-tight">Edita tu producto:</h3>
                    <p className="py-4">
                        Para cerrar presiona <kbd>Esc</kbd> o haz click fuera de la ventana modal.
                    </p>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold after:content-['*'] after:text-red-500 after:ml-0.5">
                                    Label:
                                </span>
                            </label>
                            <input name="" placeholder="" className="" />
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
