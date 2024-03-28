export interface ProjectCreationData {
    name: string;
    description: string;
    client: string;
    start_date: Date | null;
    end_date: Date | null;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    client: string;
    start_date: Date | null;
    end_date: Date | null;
}

export interface ProjectQuery {
    id: number | null | undefined;
}
