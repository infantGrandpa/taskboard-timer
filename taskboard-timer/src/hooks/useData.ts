import { useEffect, useState } from "react";

interface Props {
    endpoint: string;
    onError?: (message: string) => void;
}

const useData = <T>({ endpoint, onError }: Props) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data. Please try again.");
                if (onError) onError("Failed to fetch data. Please try again."); // Call onError callback if provided
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, onError]);

    return { data, isLoading, error };
};

export default useData;
