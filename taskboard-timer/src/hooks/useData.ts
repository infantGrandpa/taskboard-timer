import { useEffect, useState } from "react";
import { AxiosRequestConfig, CanceledError } from "axios";
import apiClient from "../services/apiService";

interface ApiResponse<T> {
    data: T[];
    message: string;
    status: string;
}

const useData = <T>(
    endpoint: string,
    requestConfig?: AxiosRequestConfig,
    deps?: any[]
) => {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState<string | undefined>(undefined);

    const fetchData = () => {
        const controller = new AbortController();

        setLoading(true);

        apiClient
            .get<T[]>(endpoint, {
                signal: controller.signal,
                ...requestConfig,
            })
            .then((res) => {
                const {
                    data: responseData,
                    message: responseMessage,
                    status: responseStatus,
                } = res.data as unknown as ApiResponse<T>;

                setStatus(responseStatus);
                setMessage(responseMessage);
                setData(responseData);
                setLoading(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setStatus("error");
                setMessage(err.message);
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

    return { data, isLoading, message, status };
};

export default useData;
