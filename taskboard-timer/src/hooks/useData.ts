import { useEffect, useState } from "react";
import axios, { CanceledError } from "axios";

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:5000/",
});

const useData = <T>(endpoint: string, deps?: any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(
        () => {
            const controller = new AbortController();

            setLoading(true);

            apiClient
                .get<T[]>(endpoint, {
                    signal: controller.signal,
                })
                .then((res) => {
                    console.log(res.data);
                    setData(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    if (err instanceof CanceledError) return;
                    setError(err.message);
                    setLoading(false);
                });
            return () => controller.abort();
        },
        deps ? [...deps] : []
    );

    return { data, isLoading, error };
};

export default useData;
