export interface TaskCreationData {
    project_id: number;
    name: string;
    estimated_hours: number;
    hours_worked: number;
}

export interface Task {
    id: number;
    project_id: number;
    name: string;
    estimated_hours: number;
    hours_worked: number;
}

export interface TaskQuery {
    id: number | null | undefined;
    project_id: number | null | undefined;
}
