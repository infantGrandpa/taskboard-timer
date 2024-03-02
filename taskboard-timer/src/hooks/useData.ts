import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, CanceledError } from "axios";

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:5000/",
});

const useData = <T>(
    endpoint: string,
    requestConfig?: AxiosRequestConfig,
    deps?: any[]
) => {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const fetchData = () => {
        const controller = new AbortController();

        setLoading(true);

        apiClient
            .get<T[]>(endpoint, {
                signal: controller.signal,
                ...requestConfig,
            })
            .then((res) => {
                const responseData = res.data
                    ? Array.isArray(res.data)
                        ? res.data
                        : [res.data]
                    : [];
                setData(responseData);
                setLoading(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            });

        return () => controller.abort();
    };

    useEffect(
        () => {
            fetchData();
        },
        deps ? [...deps] : []
    );

    return { data, isLoading, error, refetch: fetchData };
};

export default useData;
