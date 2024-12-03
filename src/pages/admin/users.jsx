import React, { useState } from "react";
import Swal from "sweetalert2";

// Hooks
import { useDeleteData, usePaginateData } from "../../hooks/useFetchApi";
import { useAuthContext } from "../../contexts/authContext.jsx";

// Components
import LoadingContent from "../../components/loadingContent";
import { EditIcon, SearchIcon, TrashIcon } from "../../components/icons";
import EditUser from "../../components/profile/editUser.jsx";

export default function UsersAdmin() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("user_id:asc");
    const {
        data: users,
        count: usersCount,
        page: usersPage,
        limit: usersLimit,
        loading: loadingUsers,
        reload: reloadUsers,
    } = usePaginateData(
        `/users?page=${page}&sort=${sort}${
            search.length > 1 ? `&search=${search}` : ""
        }`
    );
    const { userSession } = useAuthContext();

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
                const response = await useDeleteData(`/users/${id}`);

                if (response.success) {
                    reloadUsers();
                    setPage(1);
                }
            }
        });
    };

    if (loadingUsers) return <LoadingContent />;
    return (
        <>
            <section className="w-full px-3">
                <div className="w-full max-w-[1200px] mx-auto py-10">
                    <div className="space-y-5">
                        <div className="flex justify-between items-center w-full">
                            <h1 className="text-3xl font-bold mb-4">
                                Administrar usuarios
                            </h1>
                        </div>
                        <div className="card bg-[#20202b] rounded [&_p]:grow-0">
                            <div className="card-body p-4">
                                <div className="flex justify-between items-center w-full">
                                    <h2 className="text-3xl font-bold">
                                        Usuarios
                                    </h2>
                                    <label className="input input-sm input-bordered focus-within:outline-0 focus-within:input-primary flex items-center gap-2 w-full max-w-sm h-auto py-1">
                                        <input
                                            className="grow group"
                                            placeholder="Buscar usuarios"
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
                                                setSort("user_id:asc")
                                            }
                                        >
                                            ID
                                        </th>
                                        <th
                                            onClick={() =>
                                                setSort("user_name:asc")
                                            }
                                        >
                                            Nombres
                                        </th>
                                        <th
                                            onClick={() =>
                                                setSort("user_email:asc")
                                            }
                                        >
                                            Correo Electrónico
                                        </th>
                                        <th
                                            onClick={() =>
                                                setSort("role_id:asc")
                                            }
                                        >
                                            Rol
                                        </th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.user_id}>
                                            <td>
                                                {user.user_id.split("-")[1]}
                                            </td>
                                            <td>
                                                {user.user_name}{" "}
                                                {user.user_lastname}
                                            </td>
                                            <td>{user.user_email}</td>
                                            <td>{user.role.role_name}</td>
                                            <td>
                                                <div className="flex gap-2 items-center">
                                                    <button
                                                        onClick={() =>
                                                            document
                                                                .getElementById(
                                                                    `edit-user-${user.user_id}`
                                                                )
                                                                .show()
                                                        }
                                                        className="btn btn-primary btn-outline btn-sm"
                                                    >
                                                        <EditIcon size={16} />
                                                    </button>
                                                    <div
                                                        className="tooltip tooltip-accent tooltip-left"
                                                        data-tip={
                                                            userSession.user_id ==
                                                            user.user_id
                                                                ? "No puedes eliminar tu propia cuenta"
                                                                : "Eliminar usuario"
                                                        }
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteUser(
                                                                    user.user_id,
                                                                    user.name
                                                                )
                                                            }
                                                            className="btn btn-error btn-outline btn-sm"
                                                            disabled={
                                                                userSession.user_id ==
                                                                user.user_id
                                                            }
                                                        >
                                                            <TrashIcon
                                                                size={16}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
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
                                    <p>
                                        Mostrando{" "}
                                        {usersPage * usersLimit -
                                            usersLimit +
                                            1}
                                        {" - "}
                                        {usersPage * usersLimit -
                                            usersLimit +
                                            1 +
                                            users.length -
                                            1}
                                        {` de ${usersCount} resultados`}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                setPage((prev) => prev - 1)
                                            }
                                            disabled={usersPage <= 1}
                                            className="btn p-0 h-auto min-h-[auto_!important] disabled:opacity-30"
                                        >
                                            <kbd className="kbd">Anterior</kbd>
                                        </button>
                                        <button
                                            onClick={() =>
                                                setPage((prev) => prev + 1)
                                            }
                                            disabled={
                                                usersPage * usersLimit >=
                                                usersCount / usersLimit
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
            {users.map((user) => (
                <EditUser
                    key={user.user_id}
                    user={user}
                    userSession={userSession}
                    reloadUsers={reloadUsers}
                />
            ))}
        </>
    );
}
