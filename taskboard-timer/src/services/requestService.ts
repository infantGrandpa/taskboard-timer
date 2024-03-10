import apiClient from "./apiService";

type RequestMethod = "POST" | "PUT" | "DELETE";

const handleRequest = async (
    endpoint: string,
    method: RequestMethod,
    requestData: any = null
) => {
    try {
        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            ...(requestData &&
                (method === "POST" || method === "PUT") && {
                    data: requestData,
                }),
        };

        const response = await apiClient(endpoint, options);

        console.log("Server response:", response.data.message);
        return response.data;
    } catch (error) {
        console.error(`Error handling request (${method}):`, error);
    }
};

export default handleRequest;
