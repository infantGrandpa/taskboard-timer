interface ProjectData {
    name: string;
}

const addProject = async (projectData: ProjectData) => {
    try {
        const response = await fetch("http://127.0.0.1:5000/add_project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error adding new project:", error);
    }
};

export { addProject };
