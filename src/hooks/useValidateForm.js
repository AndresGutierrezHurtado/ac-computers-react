import { toast } from "react-toastify";
import {
    email,
    maxValue,
    minLength,
    minValue,
    nonEmpty,
    object,
    parse,
    pipe,
    regex,
    string,
    ValiError,
} from "valibot";

export const useValidateform = (data = {}, form = "") => {
    try {
        let schema;

        switch (form) {
            case "login-form":
                schema = object({
                    user_email: pipe(
                        nonEmpty("Correo requerido"),
                        string("Correo requerido"),
                        email("El correo debe ser válido")
                    ),
                    user_password: pipe(
                        nonEmpty("Contraseña requerida"),
                        string("Contraseña requerida"),
                        minLength(4, "La contraseña debe tener al menos 4 caracteres")
                    ),
                });
                break;
            case "register-form":
                schema = object({
                    user_name: pipe(
                        nonEmpty("Nombre requerido"),
                        string("Nombre requerido"),
                        minLength(3, "El nombre debe tener al menos 3 caracteres")
                    ),
                    user_lastname: pipe(
                        nonEmpty("Apellido requerido"),
                        string("Apellido requerido"),
                        minLength(3, "El apellido debe tener al menos 3 caracteres")
                    ),
                    user_email: pipe(
                        nonEmpty("Correo requerido"),
                        string("Correo requerido"),
                        email("El correo debe ser válido")
                    ),
                    user_password: pipe(
                        nonEmpty("Contraseña requerida"),
                        string("Contraseña requerida"),
                        minLength(4, "La contraseña debe tener al menos 4 caracteres")
                    ),
                });
                break;
            case "contact-form":
                schema = object({
                    user_email: pipe(
                        nonEmpty("Correo requerido"),
                        string("Correo requerido"),
                        email("El correo debe ser válido")
                    ),
                    email_subject: pipe(
                        nonEmpty("Asunto requerido"),
                        string("Asunto requerido"),
                        minLength(5, "El asunto debe tener al menos 5 caracteres")
                    ),
                    email_message: pipe(
                        nonEmpty("Mensaje requerido"),
                        string("Mensaje requerido"),
                        minLength(10, "El mensaje debe tener al menos 10 caracteres")
                    ),
                });
                break;
            case "create-product-form":
                schema = object({
                    product_name: pipe(
                        nonEmpty("Nombre requerido"),
                        string("Nombre requerido"),
                        minLength(3, "El nombre debe tener al menos 3 caracteres")
                    ),
                    product_description: pipe(
                        nonEmpty("Descripción requerida"),
                        string("Descripción requerida"),
                        minLength(10, "La descripción debe tener al menos 10 caracteres")
                    ),
                    product_price: pipe(
                        nonEmpty("Precio requerido"),
                        string("Precio requerido"),
                        minValue(1000, "El precio debe ser mayor a 1,000"),
                        regex(/^[0-9]+$/, "El precio debe ser un número")
                    ),
                    product_discount: pipe(
                        nonEmpty("Descuento requerido"),
                        string("Descuento requerido"),
                        minValue(0, "El descuento debe ser mayor o igual a 0"),
                        maxValue(99, "El descuento debe ser menor o igual a 99"),
                        regex(/^[0-9]+$/, "El descuento debe ser un número")
                    ),
                    category_id: pipe(
                        nonEmpty("Categoría requerida"),
                        string("Categoría requerida"),
                    ),
                });
                break;
            default:
                return { success: false, message: "Formulario no encontrado", data: null };
                break;
        }

        document
            .querySelectorAll(`.input-error, .select-error, .textarea-error`)
            .forEach((input) => {
                input
                    .closest(".form-control")
                    .querySelectorAll(".label-error")
                    .forEach((element) => element.remove());
                input.classList.remove("input-error");
                input.classList.remove("focus:input-error");
                input.classList.remove("select-error");
                input.classList.remove("focus:select-error");
                input.classList.remove("textarea-error");
                input.classList.remove("focus:textarea-error");
            });

        const finalData = parse(schema, data);
        if (form === "reset-password-form" && data.user_password !== data.user_password_confirm) {
            if (data.user_password !== data.user_password_confirm) {
                throw new ValiError([
                    {
                        path: [{ key: "user_password" }],
                        message: "Las contraseñas no coinciden",
                    },
                    {
                        path: [{ key: "user_password_confirm" }],
                        message: "Las contraseñas no coinciden",
                    },
                ]);
            }
        }

        return { success: true, message: "Formulario valido", data: finalData };
    } catch (error) {
        let fieldErrors = [];

        error.issues.forEach((issue) => {
            fieldErrors.push({
                field: issue.path[0].key,
                message: issue.message,
            });

            toast.error(issue.message, {
                theme: "colored",
                position: "bottom-right",
                autoClose: 3000,
                pauseOnHover: false,
            });

            document.querySelectorAll(`[name="${issue.path[0].key}"]`).forEach((input) => {
                input.classList.add("input-error");
                input.classList.add("focus:input-error");
                input.classList.add("select-error");
                input.classList.add("focus:select-error");
                input.classList.add("textarea-error");
                input.classList.add("focus:textarea-error");

                const errorLabel = document.createElement("label");
                errorLabel.className = "label-error text-red-500";
                errorLabel.textContent = issue.message;
                input.closest(".form-control").appendChild(errorLabel);
            });
        });

        return { success: false, message: "Formulario no valido", errors: fieldErrors };
    }
};
