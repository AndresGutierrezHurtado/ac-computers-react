import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Swal from "sweetalert2";
const API_URL = import.meta.env.VITE_API_URL;

export const useFetchData = async (endpoint, options) => {
    const request = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            "content-type": "application/json",
            accept: "application/json",
        },
        credentials: "include",
        method: "GET",
        ...options,
    });

    return request.json();
};

export const useGetData = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const getData = async () => {
            const response = await useFetchData(endpoint);
            setLoading(false);

            if (response.success) {
                setData(response.data);
            }
        };

        getData();
    }, [endpoint, trigger, location]);

    const reload = () => setTrigger((prev) => prev + 1);

    return { data, loading, reload };
};

export const usePostData = (endpoint, body) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        const getData = async () => {
            const response = await useFetchData(endpoint, {
                method: "POST",
                body: JSON.stringify(body),
            });
            setLoading(false);

            if (response.success) {
                setData(response.data);
                Swal.fire({
                    icon: "success",
                    title: "Acción realizada correctamente",
                    text: response.message,
                    timer: 8000,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Hubo un error en la petición",
                    text: response.message,
                    timer: 8000,
                });
            }
        };

        getData();
    }, [endpoint, trigger]);

    const reload = () => setTrigger((prev) => prev + 1);

    return { data, loading, reload };
};
