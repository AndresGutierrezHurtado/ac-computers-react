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
            setData(response.data);
        };

        getData();
    }, [endpoint, trigger, location]);

    const reload = () => setTrigger((prev) => prev + 1);

    return { data, loading, reload };
};

export const usePaginateData = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const getData = async () => {
            const response = await useFetchData(endpoint);
            setLoading(false);
            setData(response.data);
        };

        getData();
    }, [endpoint, trigger, location]);

    const reload = () => setTrigger((prev) => prev + 1);

    return {
        data: data?.rows,
        page: data?.page,
        limit: data?.limit,
        count: data?.count,
        loading,
        reload,
    };
};

export const usePostData = async (endpoint, body = {}) => {
    const response = await useFetchData(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
    });

    if (response.success) {
        Swal.fire({
            icon: "success",
            title: "Acción realizada correctamente",
            text: response.message,
            timer: 8000,
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: response.message,
            timer: 8000,
        });
    }

    return response;
};

export const usePutData = async (endpoint, body = {}) => {
    const response = await useFetchData(endpoint, {
        method: "PUT",
        body: JSON.stringify(body),
    });

    if (response.success) {
        Swal.fire({
            icon: "success",
            title: "Acción realizada correctamente",
            text: response.message,
            timer: 8000,
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: response.message,
            timer: 8000,
        });
    }

    return response;
};

export const useDeleteData = async (endpoint, body = {}) => {
    const response = await useFetchData(endpoint, {
        method: "DELETE",
        body: JSON.stringify(body),
    });

    if (response.success) {
        Swal.fire({
            icon: "success",
            title: "Acción realizada correctamente",
            text: response.message,
            timer: 8000,
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: response.message,
            timer: 8000,
        });
    }

    return response;
};
