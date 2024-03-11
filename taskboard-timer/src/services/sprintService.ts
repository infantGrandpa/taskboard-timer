import handleRequest from "./requestService";

export interface SprintCreationData {
    project_id: number;
    name: string;
    total_hours: number;
    completed_hours: number;
    start_date: Date | null;
    end_date: Date | null;
}

const addSprint = async (sprintData: SprintCreationData) => {
    const responseData = handleRequest("/api/add_sprint", "POST", sprintData);
    return responseData;
};

export { addSprint };
